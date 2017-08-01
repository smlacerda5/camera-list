var BlockType = require('./../blocktype/blocktype');

function Text(formulaControl, configController, config, parentControl) {
    this.formulaControl = formulaControl;
    this.configController = configController;
    this.config = config;
    this.parentControl = parentControl;
    this.path = Object.assign([], this.parentControl.path);
    this.path.push(this);
}

Text.prototype.compare = function(control) {
    return this.config == control.config;
}

Text.prototype.set = function(config) {
    this.parentControl.replace(this.config, config);
    this.configController.trashControl.set(this.config);
}

Text.prototype.pushBefore = function(config) {
    this.parentControl.pushAt(this.config, config);
}

Text.prototype.pop = function() {
    this.parentControl.remove(this.config);
    return this.config;
}

Text.prototype.replace = function(oldConfig, newConfig) {
}

Text.prototype.getOP = function() {
    return this.config.op;
}

Text.prototype.setOP = function(op) {
    this.config.op = op;
    this.configController.validate();
}

Text.prototype.setValue = function(value) {
    this.config.value = value;
    this.configController.validate();
}

Text.prototype.getConfig = function() {
    return [this.config];
}

var instance = {
    createControl: function (formulaControl, configController, config, parentControl) {
        return new Text(formulaControl, configController, config, parentControl);
    },
    createConfig: function () {
        return {type: BlockType.TEXT, op: '+', value: ''};
    }
}

module.exports = instance;