var AContainer = require('../formulacontrol/blockcontainer/acontainer');

function StatusRule() {
    this.status = {};
    this.statusRule = { none: AContainer.createConfig() };
}

StatusRule.prototype.updateStatus = function(ruleStatus) {
    var newRuleStatus = {};
    for(var key in ruleStatus) {
        var status = ruleStatus[key];
        newRuleStatus[status.name] = status;
    }
    this.status = newRuleStatus;
}

StatusRule.prototype.updateStatusRule = function(ruleStatusCondition) {
    this.statusRule['none'] = {};
    var newRuleStatusCondition = { none: {} };
    for(var key in ruleStatusCondition) {
        var statusCondition = ruleStatusCondition[key];
        var newStatusCondition = {};
        newStatusCondition['DataType'] = statusCondition.Type;
        newStatusCondition['StatusConditionName'] = statusCondition.Name;

        var conditions = statusCondition.Conditions;
        var newConditions = [];
        for(var innerKey in conditions) {
            var condition = conditions[innerKey];
            var statusName = condition.Status;
            var weight = 0.1;
            if(statusName in this.status)
                weight = this.status[statusName].weight;

            condition.Status = { status: statusName, weight: weight };
            newConditions.push(condition);
        }

        newStatusCondition['Config'] = newConditions;
        newRuleStatusCondition[statusCondition.Name] = newStatusCondition;
    }
    this.statusRule = newRuleStatusCondition;
}

StatusRule.prototype.getStatus = function(name) {
    if(name in this.status)
        return this.status[name];
    return null;
}

StatusRule.prototype.getStatusRule = function() {
    return this.statusRule;
}

module.exports = StatusRule;