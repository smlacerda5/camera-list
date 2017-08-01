var BlockType = require('./../blocktype/blocktype');

function Number(formulaControl, configController, config, parentControl) {
    this.formulaControl = formulaControl;
    this.configController = configController;
    this.config = config;
    this.parentControl = parentControl;
    this.path = Object.assign([], this.parentControl.path);
    this.path.push(this);
}

Number.prototype.compare = function(control) {
    return this.config == control.config;
}

Number.prototype.set = function(config) {
    this.parentControl.replace(this.config, config);
    this.configController.trashControl.set(this.config);
}

Number.prototype.pushBefore = function(config) {
    this.parentControl.pushAt(this.config, config);
}

Number.prototype.pop = function() {
    this.parentControl.remove(this.config);
    return this.config;
}

Number.prototype.replace = function(oldConfig, newConfig) {

}

Number.prototype.getOP = function() {
    return this.config.op;
}

Number.prototype.setOP = function(op) {
    this.config.op = op;
    this.configController.validate();
}

Number.prototype.setValue = function(value) {
    this.config.value = value;
    this.configController.validate();
}

Number.prototype.getConfig = function() {
    return [this.config];
}

var instance = {
    createControl: function (formulaControl, configController, config, parentControl) {
        return new Number(formulaControl, configController, config, parentControl);
    },
    createConfig: function () {
        return {type: BlockType.NUMBER, op: '+', value: 0};
    }
}

module.exports = instance;