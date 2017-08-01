var JsonTools = require('../../util/jsontools');

function Select(dpl, dataControl) {
    this.dpl = dpl;
    this.dataControl = dataControl;

    this.metricIndex = 1;
    this.propertyIndex = 1;
}

Select.prototype.addProp = function() {
    while(true) {
        var newPropertyKey = 'property_' + this.propertyIndex++;
        if(!(newPropertyKey in this.dpl.config.select.object.properties)) {
            this.dpl.config.select.object.properties[newPropertyKey] = JsonTools.createDefaultVAConfig();
            return [ 'object', 'properties', newPropertyKey ];
        }
    }
}

Select.prototype.removeProp = function(key) {
    delete this.dpl.config.select.object.properties[key];

    // todo : value에 dataControl 물리지 않는 방법 모색
    this.dataControl.validate();
}

Select.prototype.add = function() {
    while(true) {
        var newMetricName = 'metric_' + this.metricIndex++;
        if(!(newMetricName in this.dpl.config.select)) {
            this.dpl.config.select[newMetricName] = JsonTools.createDefaultVAConfig();
            return [ newMetricName ];
        }
    }
}

Select.prototype.moveToUp = function(from, to) {
    JsonTools.pushBefore(JsonTools.pop((this.dpl.config.select), from, 0), this.dpl.config.select, to);

    // todo : value에 dataControl 물리지 않는 방법 모색
    this.dataControl.validate();
}

Select.prototype.moveToDown = function(from, to) {
    JsonTools.pushAfter(JsonTools.pop((this.dpl.config.select), from, 0), this.dpl.config.select, to);

    // todo : value에 dataControl 물리지 않는 방법 모색
    this.dataControl.validate();
}

Select.prototype.moveToRight = function(from, to) {
    JsonTools.pushIn(JsonTools.pop((this.dpl.config.select), from, 0), this.dpl.config.select, to);

    // todo : value에 dataControl 물리지 않는 방법 모색
    this.dataControl.validate();
}

Select.prototype.remove = function(path) {
    JsonTools.pop((this.dpl.config.select), path, 0);

    // todo : value에 dataControl 물리지 않는 방법 모색
    this.dataControl.validate();
}

Select.prototype.rename = function(path, newName) {
    JsonTools.rename(this.dpl.config.select, path, newName);

    // todo : value에 dataControl 물리지 않는 방법 모색
    this.dataControl.validate();
}

module.exports = Select;