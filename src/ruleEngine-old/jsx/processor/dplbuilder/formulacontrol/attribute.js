
function AttributeControl(dataControl, statusRule, path, config) {
    this.dataControl = dataControl;
    this.statusRule = statusRule;

    this.type = 'attribute';
    this.path = path;
    this.config = config;
}

AttributeControl.prototype.getStatusRuleName = function() {
    return this.config.StatusConditionName;
}

AttributeControl.prototype.getStatusRuleList = function() {
    return Object.keys(this.statusRule.getStatusRule());
}

AttributeControl.prototype.setStatusRule = function(name) {
    var targetStatusRule = this.statusRule.getStatusRule()[name];
    this.config.DataType = targetStatusRule.DataType;
    this.config.StatusConditionName = targetStatusRule.StatusConditionName;
    this.dataControl.validate();
}

module.exports = AttributeControl;