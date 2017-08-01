var JsonTools = require('./jsontools');
// note : 재진입성 충족하는 method만 위치 합니다.

var tableTools = {
    configToTableMatrix : function (config, select, error, data, attr, path, depth, tableInfo) {
        // note : config는 formula가 array, path가 object, 그외는 아무값도 아닌 관계로 처리되지 않음
        var ret = [];
        if(config != null) {
            if(typeof config == 'object') {
                if(JsonTools.vaKey in config) {
                    // note : value
                    ret.push([{isLeaf: true, formula: config, select: select, error: error, value: data, attr: attr, noc: 0, depth: depth, path: path}]);
                    if(tableInfo.maxDepth < depth)
                        tableInfo.maxDepth = depth;
                }
                else {
                    // note : object는 head가 key
                    for(var key in config) {
                        var currentConfig = config[key];
                        var currentSelect = ((select != null) && typeof select == 'object' && (key in select)) ? select[key] : null;
                        var currentError = ((error != null) && typeof error == 'object' && (key in error)) ? error[key] : null;
                        var currentValue = ((data != null) && typeof data == 'object' && (key in data)) ? data[key] : null;
                        var currentAttr = ((attr != null) && typeof attr == 'object' && (key in attr)) ? attr[key] : null;
                        var currentPath = path.slice(0);
                        currentPath.push(key);

                        var result = this.configToTableMatrix(currentConfig, currentSelect, currentError, currentValue, currentAttr, currentPath, depth + 1, tableInfo);

                        if(result.length > 0) {
                            result[0].push({isLeaf: false, value: key, noc: result.length, depth: 0, path: currentPath});
                            ret = ret.concat(result);
                        }
                    }
                }
            }
        }
        return ret;
    },
    dataToTableMatrix : function (data, attr, path, depth, tableInfo) {
        var ret = [];

        if(data == null || typeof data != 'object') {
            // note : value
            ret.push([{isLeaf: true, value: data, attr: attr, noc: 0, depth: depth, path: path}]);
            if(tableInfo.maxDepth < depth)
                tableInfo.maxDepth = depth;
        }
        else {
            if(Array.isArray(data)) {
                for(var i = 0, len = data.length; i < len; i++) {
                    var currentData = data[i];
                    var currentAttr = (Array.isArray(attr)  && attr.length > i) ? attr[i] : null;
                    var currentPath = path.slice(0);
                    currentPath.push(i.toString());

                    var result = this.dataToTableMatrix(currentData, currentAttr, currentPath, depth + 1, tableInfo);

                    if(result.length > 0) {
                        result[0].push({isLeaf: false, value: '[' + i + ']', noc: result.length, depth: 0, path: currentPath});
                        ret = ret.concat(result);
                    }
                }
            }
            else {
                for(var key in data) {
                    var currentData = data[key];
                    var currentAttr = ((attr != null) && typeof attr == 'object' && (key in attr)) ? attr[key] : null;
                    var currentPath = path.slice(0);
                    currentPath.push(key);

                    var result = this.dataToTableMatrix(currentData, currentAttr, currentPath, depth + 1, tableInfo);

                    if(result.length > 0) {
                        result[0].push({isLeaf: false, value: key, noc: result.length, depth: 0, path: currentPath});
                        ret = ret.concat(result);
                    }
                }
            }
        }

        return ret;
    }
}

module.exports = tableTools;