var __ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var ActionType = require('./dispatcher/actiontype');
var ActionDispatcher = require('./dispatcher/actiondispatcher');
var MethodType = require('./dispatcher/methodtype')
var _jobData = {};
var _jobTypeData = {};

function updateJobData(data) {
    var newJob = {};

    data.map(function(job) {
        newJob[job.Name] = null;

        var relationSource = { from: {}, to: {}};
        if(job.RelationSource != null) {
            if(job.RelationSource.From != null) {
                for(var index in job.RelationSource.From) {
                    var originString = job.RelationSource.From[index];
                    var splitedString = originString.split(':_^_:');
                    if(splitedString.length == 4);
                        relationSource.from[splitedString[1]] = {
                            origin: originString,
                            relationTo: splitedString[3]
                        };
                }
            }
            if(job.RelationSource.To != null) {
                for(var index in job.RelationSource.To) {
                    var originString = job.RelationSource.To[index];
                    var splitedString = originString.split(':_^_:');
                    if(splitedString.length == 4)
                        relationSource.to[splitedString[0]] = {
                            origin: originString,
                            relationTo: splitedString[2]
                        };
                }
            }
        }

        if(!(job.Name in _jobData)) {
            _jobData[job.Name] = {
                name: job.Name,
                type: job.ModuleType,
                relationSource: relationSource,
                x: 0, y: 0, r: 0
            }
        }
        else {
            var target = _jobData[job.Name];
            target.type = job.ModuleType;
            target.relationSource = relationSource
        }
    })

    Object.keys(_jobData).map(function(jobName) {
        if(!(jobName in newJob)) {
            delete _jobData[jobName];
        }
    });
}

function updateJobTypeData(data) {
    for(var jobType in _jobTypeData)
        delete _jobTypeData[jobType];

    for (var type in data) {
        data[type].forEach(function (name) {
            var jobType = type;
            var jobTypeObject = null;
            if(!(jobType in _jobTypeData))
                _jobTypeData[jobType] = jobTypeObject = [];
            else
                jobTypeObject = _jobTypeData[jobType];

            jobTypeObject.push({
                moduleName: name,
                x: 0, y: 0, r: 0
            });
        });
    }
}

ActionDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case ActionType.UPDATE_DATA:
            var accordions = {};
            n.call("accordion.list", {}, function(err, res){
                res.body.forEach(function (accordion){
                    var resources = Object.keys(accordion.parsedDoc.resources).map(function (resource) {
                        return window.atob(resource);
                    });
                    accordions[accordion.name] = resources;
                });
            })
            n.call("job.moduleinfo", {}, function(err, res) {
                if (res != null && res.statusCode == 200) {
                    Object.keys(res.body).forEach(function (name){
                        if (accordions[res.body[name]]) accordions[res.body[name]].push(name);
                        else accordions[res.body[name]] = [name];
                    })
                    updateJobTypeData(accordions);
                    n.call("job.list", {}, function (err, res) {
                        if (res != null && res.statusCode == 200) {
                            updateJobData(res.body);
                            DataContext.emit(DataContext.callbackType.Data, _jobData, _jobTypeData);
                        }
                    });
                }
            });
            break;
        case ActionType.UPDATE_ALIGN:
            DataContext.emit(DataContext.callbackType.Align, action.data);
            break;
        case ActionType.NEW_JOB:
            var param = {
                Name: action.data.name,
                Description: '',
                ModuleName: (action.data.type === 'feeder' || action.data.type === 'processor') ? action.data.moduleName : 'RestAPIReceiver',
                ModuleConfig: { Metric: {} }
            };

            n.call("job.upsert", param, function(err, res) {
                if(res != null && res.statusCode == 200){
                    n.call("job.list", {}, function(err, res){
                        if(res != null && res.statusCode == 200) {
                            updateJobData(res.body);
                            DataContext.emit(DataContext.callbackType.Data, _jobData, _jobTypeData);
                        }
                    });
                    if (action.data.type !== 'feeder' && action.data.type !== 'processor') {
                        n.call('job.get', { Name: [action.data.name] }, function(err, res) {
                            if(res != null && res.statusCode == 200 && res.body.length > 0) {
                                n.call('job.validate', { 'Job': res.body[0] }, function(err, res) {
                                    var moduleConfig = res.body.ModuleConfig;
                                    n.call('accordion.list', { name: {'$regex' : '^' + action.data.type + '$', '$options': 'i' }}, function(err, res) {
                                        if(res != null && res.success) {
                                            var doc = res.body[0].parsedDoc;
                                            var headers = [];
                                            var queryParameter = {};
                                            var body = {};
                                            var decodeUri = window.btoa(action.data.moduleName);
                                            var options = Object.keys(doc.resources[decodeUri]);
                                            var selectedOption;
                                            if (options.includes('post')) selectedOption = 'post';
                                            else if (options.includes('get')) selectedOption = 'get';
                                            else selectedOption = options[0];
                                            var bodyRequire = !(selectedOption.toUpperCase() === MethodType.GET || selectedOption.toUpperCase() === MethodType.DELETE || selectedOption.toUpperCase() === MethodType.HEAD || selectedOption.toUpperCase() === MethodType.OPTIONS);
                                            if (doc.securedBy.length > 0) {
                                                doc.securedBy.map(function (type){
                                                    var securityParameters = getParameters(doc.securitySchemes[type]);
                                                    if (securityParameters.headers.length > 0) headers = Object.assign(headers, securityParameters.headers);
                                                    queryParameter = Object.assign(queryParameter, securityParameters.queryParameters);
                                                    body = bodyRequire && Object.assign(body, securityParameters.body);
                                                })
                                            }

                                            var methodConfig = doc.resources[decodeUri][selectedOption];
                                            var methodParameter = getParameters(methodConfig);
                                            if (methodParameter.headers.length > 0) headers = Object.assign(headers, methodParameter.headers);
                                            body = Object.assign(body, methodParameter.body);
                                            queryParameter = Object.assign(queryParameter, methodParameter.queryParameters);
                                            if(methodConfig.is) {
                                                methodConfig.is.map(function (name){
                                                    var isParameters = getParameters(doc.traits[name]);
                                                    if (isParameters.headers.length > 0) headers = Object.assign(headers, isParameter.headers);
                                                    body = Object.assign(body, isParameters.body);
                                                    queryParameter = Object.assign(queryParameter, isParameters.queryParameters);
                                                });
                                            }
                                            moduleConfig.scheme.http_method.value = selectedOption.toUpperCase();
                                            if (!bodyRequire) {
                                                var tempString = '?';
                                                Object.keys(queryParameter).forEach(function (key, i){
                                                    if(i !== 0) tempString += '&';
                                                    tempString += key + '={' + key + '}';
                                                    moduleConfig.scheme.http_url.value = doc.baseUri + action.data.moduleName + tempString;
                                                })
                                            }
                                            else {
                                                var bodyContent = JSON.stringify(Object.assign(queryParameter, body), null, 2);
                                                moduleConfig.scheme.http_url.value = doc.baseUri + action.data.moduleName;
                                                moduleConfig.scheme.http_content.value = bodyContent;
                                            }
                                            moduleConfig.scheme.http_head.value = headers;
                                            param.ModuleConfig = moduleConfig;
                                            n.call("job.upsert", param, function(err, res){

                                            });
                                        }
                                    })
                                });
                            }
                        });
                    }
                }
            });
            break;
        case ActionType.DEL_JOB:
            var param = [ action.data.name ];

            n.call("job.delete", param, function(err, res) {
                n.call("job.list", {}, function(err, res){
                    if(res != null && res.statusCode == 200) {
                        updateJobData(res.body);
                        DataContext.emit(DataContext.callbackType.Data, _jobData, _jobTypeData);
                    }
                });
            });
            break;
        case ActionType.OPEN_JOB_DETAIL:
            n.call('job.get', { Name: [action.data.name] }, function(err, res) {
                if(res != null && res.statusCode == 200 && res.body.length > 0) {
                    DataContext.emit(DataContext.callbackType.DetailData, { detailData: res.body[0], config: action.data });
                }
            });
            break;
        case ActionType.CLOSE_JOB_DETAIL:
            if(!$.isEmptyObject(action.data)) {
                n.call("job.upsert", action.data, function(err, res) {
                    if(res != null && res.statusCode == 200){
                        n.call("job.list", {}, function(err, res) {
                            if(res != null && res.statusCode == 200) {
                                updateJobData(res.body);
                                var waitTime = 0;

                                var now = Date.now();
                                if(action.timestamp != undefined)
                                    waitTime = 400 - (now - action.timestamp);

                                if(waitTime < 0 || waitTime > 5000)
                                    waitTime = 0;

                                setTimeout(function() {
                                    DataContext.emit(DataContext.callbackType.Data, _jobData, _jobTypeData);
                                    DataContext.emit(DataContext.callbackType.DetailData, {});
                                }, waitTime);
                            }
                        });
                    }
                });
            }
            else {
                setTimeout(function() {
                    DataContext.emit(DataContext.callbackType.DetailData, {});
                }, 400);
            }
            break;
        default:
            return true;
    }
    return true;
});

function getParameters(obj) {
    var headers = [];
    var queryParameter = {};
    var body = {};

    if(obj.queryParameters) {
        Object.keys(obj.queryParameters).forEach(function (key){
            queryParameter[key] = '';
        })
    }

    if(obj.headers) {
        Object.keys(obj.headers).forEach(function (key){
            headers.push({key : key, value: ''});
        })
    }

    if(obj.body) {
        obj.body.map(function (content){
            var json = {};
            if (content.schemaContent) json = JSON.parse(content.schemaContent["properties"]);
            else if(content.formParameters) json = content.formParameters;
            Object.keys(json).map(function (property) {
                body[property] = "";
            });
        })
    }

    return { headers: headers, queryParameters: queryParameter, body: body }
}

var DataContext = __.extend({}, EventEmitter.prototype, {
    callbackType: {
        Data: 'data',
        DetailData: 'detailData',
        Align: 'align'
    },
    regist: function(callbackType, callback) {
        this.on(callbackType, callback);
    },
    unregist: function(callbackType, callback) {
        this.removeListener(callbackType, callback);
    }
});

module.exports = DataContext;