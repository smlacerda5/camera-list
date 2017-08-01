var BlockType = require('./../blocktype/blocktype');

function NULL(formulaControl, configController, config, parentControl) {
    this.formulaControl = formulaControl;
    this.configController = configController;
    this.config = config;
    this.parentControl = parentControl;
    this.path = Object.assign([], this.parentControl.path);
    this.path.push(this);
}

NULL.prototype.compare = function(control) {
    return this.config == control.config;
}

NULL.prototype.set = function(config) {
    this.parentControl.replace(this.config, config);
    this.configController.trashControl.set(this.config);
}

NULL.prototype.pushBefore = function(config) {
    this.parentControl.pushAt(this.config, config);
}

NULL.prototype.pop = function() {
    this.parentControl.remove(this.config);
    return this.config;
}

NULL.prototype.replace = function(oldConfig, newConfig) {
}

NULL.prototype.getOP = function() {
    return this.config.op;
}

NULL.prototype.setOP = function(op) {
    this.config.op = op;
    this.configController.validate();
}

NULL.prototype.getConfig = function() {
    return [this.config];
}

var instance = {
    createControl: function (formulaControl, configController, config, parentControl) {
        return new NULL(formulaControl, configController, config, parentControl);
    },
    createConfig: function () {
        return {type: BlockType.NULL, op: '+'};
    }
}

module.exports = instance;