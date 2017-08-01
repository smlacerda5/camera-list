var VContainer = require('../dplbuilder/formulacontrol/blockcontainer/vcontainer');
var AContainer = require('../dplbuilder/formulacontrol/blockcontainer/acontainer');

var jsonTools = {
    vaKey: '_v_a_k_e_y_s_e_t_',
    createDefaultVAConfig: function () {
        return {
            _v_a_k_e_y_s_e_t_: null,
            value: VContainer.createConfig(),
            attribute: AContainer.createConfig()
        };
    },
    arrayToJson: function (array, lastValue) {
        var ret = {};
        var cursor = ret;

        if(array != null) {
            for(var i = 0, len = array.length - 1; i < len; i++) {
                var key = array[i];

                var newObj = {};
                cursor[key] = newObj;
                cursor = newObj;
            }
            cursor[array[array.length - 1]] = lastValue;
        }

        return ret;
    },
    deepClone: function(origin) {
        return JSON.parse(JSON.stringify(origin));
    },
    clone: function(origin) {
        var ret = {};
        for(var key in origin) ret[key] = origin[key];
        return ret;
    },
    pop : function (data, path, index) {
        var key = path[index];
        var currentData = data[key];

        if (index + 1 >= path.length) {
            var ret = {};
            ret[key] = currentData;
            delete data[key];
            return ret;
        }

        var result = this.pop(currentData, path, index+1);

        if(_.size(currentData) <= 0) {
            data[key] = this.createDefaultVAConfig();;
        }

        return result;
    },
    pushIn: function(src, dst, path) {
        var selector = dst;
        for(var i = 0, len = path.length - 1; i < len; i++) {
            var key = path[i];
            selector = selector[key];
        }

        var lastToKey = path[path.length-1];
        var toNode = selector[lastToKey];

        if(this.vaKey in toNode){
            var newNode = {};
            //if(toNode.length > 0) newNode[lastToKey + '_inner'] = toNode;
            for(var key in src) newNode[key] = src[key];
            selector[lastToKey] = newNode;
        }
        else {
            for(var key in src) toNode[key] = src[key];
        }
    },
    pushBefore: function(src, dst, path) {
        var selector = dst;
        for(var i = 0, len = path.length - 1; i < len; i++) {
            var key = path[i];
            selector = selector[key];
        }

        var lastKey = path[path.length-1];

        var afterFlag = false;
        Object.keys(selector).map(function(k) {
            if(afterFlag) {
                var lastValue = selector[k];
                delete selector[k];
                selector[k] = lastValue;
            }

            if(k == lastKey) {
                for(var key in src) selector[key] = src[key];
                var lastValue = selector[k];
                delete selector[k];
                selector[k] = lastValue;
                afterFlag = true;
            }
        });
    },
    pushAfter: function(src, dst, path) {
        var selector = dst;
        for(var i = 0, len = path.length - 1; i < len; i++) {
            var key = path[i];
            selector = selector[key];
        }

        var lastKey = path[path.length-1];

        var afterFlag = false;
        Object.keys(selector).map(function(k) {
            if(afterFlag) {
                var lastValue = selector[k];
                delete selector[k];
                selector[k] = lastValue;
            }

            if(k == lastKey) {
                for(var key in src) selector[key] = src[key];
                afterFlag = true;
            }
        });
    },
    rename: function(data, path, name) {
        var selector = data;
        for(var i = 0, len = path.length - 1; i < len; i++) {
            var key = path[i];
            selector = selector[key];
        }

        var lastKey = path[path.length-1];
        if(lastKey == name) return;

        var afterFlag = false;
        Object.keys(selector).map(function(k) {
            if(afterFlag) {
                var lastValue = selector[k];
                delete selector[k];
                selector[k] = lastValue;
            }

            if(k == lastKey) {
                var lastValue = selector[lastKey];
                delete selector[lastKey];
                selector[name] = lastValue;
                afterFlag = true;
            }
        });
    },
    get: function(data, path) {
        var selector = data;
        for(var i = 0, len = path.length; i < len; i++) {
            var key = path[i];
            if(!(key in selector))
                return null;
            selector = selector[key];
        }
        return selector;
    },
    set: function(data, path, value) {
        var selector = data;
        for(var i = 0, len = path.length - 1; i < len; i++) {
            var key = path[i];
            selector = selector[key];
        }

        selector[path[path.length-1]] = value;
    }
}

module.exports = jsonTools;