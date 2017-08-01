
function ReferenceAligner() {
}

ReferenceAligner.prototype.alignByRef = function(dataContainer) {
    var currentGroup = [];
    var leftGroup = {};

    for(var key in dataContainer.data) {
        var nodeInfo = dataContainer.data[key];
        nodeInfo.uiInfo = { depth: 0 };
        if(Object.keys(nodeInfo.relationSource.from).length > 0) leftGroup[key] = nodeInfo;
        else if(Object.keys(nodeInfo.relationSource.to).length > 0) { currentGroup.push(nodeInfo); nodeInfo.uiInfo.depth = 1; }
    }

    var currentDepth = 1;
    while(currentGroup.length > 0) {
        currentDepth++;
        var nextGroup = [];
        for(var index in currentGroup) {
            var target = currentGroup[index];
            for(var toKey in target.relationSource.to) {
                if(toKey in leftGroup) {
                    var nextTarget = leftGroup[toKey];
                    nextTarget.uiInfo.depth = currentDepth;
                    nextGroup.push(nextTarget);
                }
            }
        }
        currentGroup = nextGroup;
    }

    var ret = [];
    for(var i = 0; i < currentDepth; i++) ret.push([]);
    for(var key in dataContainer.data) {
        var nodeInfo = dataContainer.data[key];
        ret[nodeInfo.uiInfo.depth].push(nodeInfo);
    }
    return ret;
}

var instance = new ReferenceAligner();

module.exports = instance;