var BlockType = require('./../blocktype/blocktype');
var VContainer = require('./../blockcontainer/vcontainer');

function BoolComp(formulaControl, configController, config, parentControl) {
    this.formulaControl = formulaControl;
    this.configController = configController;
    this.config = config;
    this.parentControl = parentControl;
    this.path = Object.assign([], this.parentControl.path);
    this.path.push(this);
}

BoolComp.prototype.compare = function(control) {
    return this.config == control.config;
}

BoolComp.prototype.set = function(config) {
    this.parentControl.replace(this.config, config);
    this.configController.trashControl.set(this.config);
}

BoolComp.prototype.replace = function(oldConfig, newConfig) {

}

BoolComp.prototype.pop = function() {
    this.parentControl.remove(this.config);
    return this.config;
}

BoolComp.prototype.getCP = function() {
    return this.config.cp;
}

BoolComp.prototype.setCP = function(cp) {
    this.config.cp = cp;
    this.configController.validate();
}

BoolComp.prototype.getSelectedConfig = function(startConfig, endConfig) {
    return [this.config];
}

BoolComp.prototype.getConfig = function() {
    return [this.config];
}

var ref = {
    createControl: function (formulaControl, configController, config, parentControl) {
        return new BoolComp(formulaControl, configController, config, parentControl);
    },
    createConfig: function () {
        return {type: BlockType.BOOLCOMP, cp: '==', left: VContainer.createConfig(), right: VContainer.createConfig() };
    }
}

module.exports = ref;