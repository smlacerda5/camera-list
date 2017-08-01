var BlockType = require('./../blocktype/blocktype');
var VContainer = require('./../blockcontainer/vcontainer');

function Cast(formulaControl, configController, config, parentControl) {
    this.formulaControl = formulaControl;
    this.configController = configController;
    this.config = config;
    this.parentControl = parentControl;
    this.path = Object.assign([], this.parentControl.path);
    this.path.push(this);
}

Cast.prototype.compare = function(control) {
    return this.config == control.config;
}

Cast.prototype.set = function(config) {
    this.parentControl.replace(this.config, config);
    this.configController.trashControl.set(this.config);
}

Cast.prototype.pushBefore = function(config) {
    this.parentControl.pushAt(this.config, config);
}

Cast.prototype.pop = function() {
    this.parentControl.remove(this.config);
    return this.config;
}

Cast.prototype.replace = function(oldConfig, newConfig) {
}

Cast.prototype.getOP = function() {
    return this.config.op;
}

Cast.prototype.setOP = function(op) {
    this.config.op = op;
    this.configController.validate();
}

Cast.prototype.getCast = function() {
    return this.config.cast;
}

Cast.prototype.setCast = function(name) {
    this.config.cast = name;
    this.configController.validate();
}

Cast.prototype.getConfig = function() {
    return [this.config];
}

var instance = {
    createControl: function (formulaControl, configController, config, parentControl) {
        return new Cast(formulaControl, configController, config, parentControl);
    },
    createConfig: function () {
        return {type: BlockType.CAST, op: '+', cast: 'bit', params: [VContainer.createConfig()]};
    }
}

module.exports = instance;