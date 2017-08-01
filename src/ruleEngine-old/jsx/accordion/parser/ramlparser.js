var raml = require("raml-1-parser");

var RamlParser = {
    parseByUri: function(url, _callback) {
        try {
            var api = raml.loadApiSync(url, { rejectOnErrors: true }).expand();
            this.parseAPI(api, _callback);
        }
        catch(e) {
            _callback({error: e.message});
            return;
        }
    },

    parseByFile: function (selectedPath, files, _callback) {
        try {
            var currentPath = selectedPath.split('/')[0];
            var fileName = files[selectedPath];
            var self = this;
            var api = raml.parseRAMLSync(fileName, {
                fsResolver: {
                    content: function(path){
                        return files[currentPath + path];
                    }
                }
            }).expand();
            this.parseAPI(api, _callback);
        }
        catch(e) {
            _callback({error: e.message});
            return;
        }
    },

    parseAPI: function (api, _callback) {
        var parsedJson = {};
        parsedJson.baseUri = api.baseUri().value();
        parsedJson.traits = {};
        api.traits().forEach(function (trait) {
            parsedJson.traits[trait.name()] = trait.toJSON()[trait.name()];
        })
        parsedJson.securitySchemes = {};
        var securitySchemes = api.securitySchemes();
        securitySchemes.forEach(function (scheme) {
            var schemeName = scheme.name();
            parsedJson.securitySchemes[schemeName] = scheme.describedBy() ? scheme.describedBy().toJSON() : {};
        });

        var resources = api.resources()
        var securedBy = api.securedBy();
        parsedJson.securedBy = securedBy.map(function (security){
            return security.name();
        })
        parsedJson.resources = {};
        var self = this;
        resources.forEach(function (resource) {
            self.getResources(resource, '', parsedJson.resources);
        });
        _callback(parsedJson);
    },

    getResources:function (currentResource, parentUri, obj) {
        methods = currentResource.methods();
        var currentUri = currentResource.completeRelativeUri();
        var relativeUri = parentUri.length > 0 && currentUri.indexOf(parentUri) === -1 ? parentUri + currentUri : currentUri;
        var encodedUri = window.btoa(relativeUri);
        var self = this;
        if (methods.length > 0) {
            obj[encodedUri] = {};
            methods.forEach(function (method) {
                var methodObj = {};
                var is = method.is();
                if(is.length > 0)
                    methodObj.is = is.map(function (obj){
                        var trait = obj.trait();
                        return trait.name();
                    })
                var securedBy = method.securedBy();
                if(securedBy.length > 0)
                methodObj.securedBy = securedBy.map(function(security){
                    return security.name();
                })
                var uriParameters = currentResource.uriParameters();
                if (uriParameters.length > 0)
                    methodObj.uriParameters = {};
                    uriParameters.forEach(function (uriParameter) {
                        methodObj.uriParameters[uriParameter.name()] = uriParameter.toJSON();
                    });
                var type = method.method();
                var queryParameters = method.queryParameters();
                if (queryParameters.length > 0)
                    methodObj.queryParameters = {};
                    queryParameters.forEach(function (queryParameter) {
                        methodObj.queryParameters[queryParameter.name()] = queryParameter.toJSON();
                    });
                var bodies = method.body();
                if (bodies.length > 0)
                    methodObj.body = bodies.map(function (body){
                        return body.toJSON();
                    });
                var headers = method.headers();
                if (headers.length > 0)
                    methodObj.headers = headers.forEach(function (header){
                        return header.toJSON();
                    });
                obj[encodedUri][type] = methodObj;
            })
        }
        var childResources = currentResource.resources();
        if (childResources.length > 0)
            childResources.map(function (resource) {
                self.getResources(resource, relativeUri, obj);
            })
    }
}

module.exports = RamlParser;