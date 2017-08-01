var BlockType = require('./../blocktype/blocktype');
var VContainer = require('./../blockcontainer/vcontainer');

function Bracket(formulaControl, configController, config, parentControl) {
    this.formulaControl = formulaControl;
    this.configController = configController;
    this.config = config;
    this.parentControl = parentControl;
    this.path = Object.assign([], this.parentControl.path);
    this.path.push(this);
}

Bracket.prototype.compare = function(control) {
    return this.config == control.config;
}

Bracket.prototype.set = function(config) {
    this.parentControl.replace(this.config, config);
    this.configController.trashControl.set(this.config);
}

Bracket.prototype.pushBefore = function(config) {
    this.parentControl.pushAt(this.config, config);
}

Bracket.prototype.pop = function() {
    this.parentControl.remove(this.config);
    return this.config;
}

Bracket.prototype.replace = function(oldConfig, newConfig) {
}

Bracket.prototype.getOP = function() {
    return this.config.op;
}

Bracket.prototype.setOP = function(op) {
    this.config.op = op;
    this.configController.validate();
}

Bracket.prototype.getConfig = function() {
    return [this.config];
}

var ref = {
    createControl: function (formulaControl, configController, config, parentControl) {
        return new Bracket(formulaControl, configController, config, parentControl);
    },
    createConfig: function () {
        return {type: BlockType.BRACKET, op: '+', params: [VContainer.createConfig()]};
    }
}

module.exports = ref;