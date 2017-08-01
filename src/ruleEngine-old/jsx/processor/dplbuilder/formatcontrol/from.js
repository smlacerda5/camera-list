
function From(dpl, dataControl) {
    this.dpl = dpl;
    this.dataControl = dataControl;
}

From.prototype.getName = function(id) {
    if(id in this.dpl.config.from)
        return this.dpl.config.from[id].name;
    return '';
}

From.prototype.updateAlias = function(tableID, from, to) {
    if(tableID in this.dpl.config.from) {
        var fromTarget = this.dpl.config.from[tableID];
        fromTarget.alias.from = from;
        fromTarget.alias.to = to;
        this.dataControl.validate();
    }
}

From.prototype.add = function(tableName) {
    while(true) {
        var key = (new Date).getTime().toString();
        if(!(key in this.dpl.config.from)) {
            this.dpl.config.from[key] = {id: key, name:tableName, alias:{ from: this.dataControl.detailData.Name, to: tableName }, targetID: '', targetKey:[], myKey:[], join:''}
            this.dataControl.validate();
            break;
        }
    }
}

From.prototype.remove = function(tableID) {
    for(var key in this.dpl.config.from) {
        var targetTable = this.dpl.config.from[key];
        if(targetTable.targetID == tableID) {
            targetTable.targetID = '';
            targetTable.targetKey = '';
            targetTable.myKey = '';
            targetTable.join = '';
        }
    }

    delete this.dpl.config.from[tableID];
    this.dataControl.validate();
}

From.prototype.join = function(leftTableID, leftIDPath, rightTableID, rightIDPath) {
    // note : cycle check
    var keyContainer = {};
    keyContainer[rightTableID] = null;
    if(!this.checkCycle(leftTableID, keyContainer)) return;

    // note : set join information to right table
    if(!(rightTableID in this.dpl.config.from)) return;
    var rightFrom = this.dpl.config.from[rightTableID];
    rightFrom.targetID = leftTableID;
    rightFrom.targetKey = leftIDPath;
    rightFrom.myKey = rightIDPath;
    rightFrom.join = 'full';

    // note : update display
    this.dataControl.validate();
}

From.prototype.checkCycle = function(targetID, keyContainer) {
    if(!(targetID in this.dpl.config.from)) return false;
    if(targetID in keyContainer) return false;
    keyContainer[targetID] = null;
    targetTable = this.dpl.config.from[targetID];
    if(targetTable.targetID.length <= 0) return true;
    return this.checkCycle(targetTable.targetID, keyContainer);
}

module.exports = From;