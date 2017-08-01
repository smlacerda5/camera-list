var BlockType = require('./blocktype');

function BlockTool() {
}

BlockTool.prototype.getAssignableList = function(targetConfig) {
    if (typeof targetConfig == 'object' && 'type' in targetConfig){
        switch (targetConfig.type) {
            case BlockType.VCONTAINER:
            case BlockType.NULL:
            case BlockType.TEXT:
            case BlockType.NUMBER:
            case BlockType.CAST:
            case BlockType.REF:
            case BlockType.POSTREF:
            case BlockType.BRACKET:
            case BlockType.FUNC:
            case BlockType.CASE:
                return [BlockType.NULL, BlockType.TEXT, BlockType.NUMBER, BlockType.CAST, BlockType.REF, BlockType.POSTREF, BlockType.BRACKET, BlockType.FUNC, BlockType.CASE];
            case BlockType.CCONTAINER:
                if(targetConfig.container != null)
                    return [BlockType.BOOLBIN];
                return [BlockType.BOOLBIN, BlockType.BOOLCOMP];
            case BlockType.BOOLBIN:
            case BlockType.BOOLCOMP:
                    return [BlockType.BOOLBIN, BlockType.BOOLCOMP];
            default:
                return [];
        }
    }

    return [];
}

BlockTool.prototype.replace = function(targetConfig, newConfig) {
    Object.keys(targetConfig).map(function(k) {
        delete targetConfig[k];
    });

    for(k in newConfig)
        targetConfig[k] = newConfig[k];
}

BlockTool.prototype.wrapToParam = function(targetConfig, newConfig) {
    var innerConfig = {};
    Object.keys(targetConfig).map(function(k) {
        innerConfig[k] = targetConfg[k];
        delete targetConfig[k];
    });

    for(k in newConfig)
        targetConfig[k] = newConfig[k];
    targetConfig.params[0] = innerConfig;
}

BlockTool.prototype.wrapToLeft = function(targetConfig, newConfig) {
    var innerConfig = {};
    Object.keys(targetConfig).map(function(k) {
        innerConfig[k] = targetConfg[k];
        delete targetConfig[k];
    });

    for(k in newConfig)
        targetConfig[k] = newConfig[k];
    targetConfig.left = innerConfig;
}

var blockTool = new BlockTool();

module.exports = blockTool;