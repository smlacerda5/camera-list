var BlockType = require('./../blocktype/blocktype');
var CContainer = require('./../blockcontainer/ccontainer');

function BoolBin(formulaControl, configController, config, parentControl) {
    this.formulaControl = formulaControl;
    this.configController = configController;
    this.config = config;
    this.parentControl = parentControl;
    this.path = Object.assign([], this.parentControl.path);
    this.path.push(this);
}

BoolBin.prototype.compare = function(control) {
    return this.config == control.config;
}

BoolBin.prototype.set = function(config) {
    this.parentControl.replace(this.config, config);
    this.configController.trashControl.set(this.config);
}

BoolBin.prototype.replace = function(oldConfig, newConfig) {

}

BoolBin.prototype.pop = function() {
    this.parentControl.remove(this.config);
    return this.config;
}

BoolBin.prototype.getBP = function() {
    return this.config.bp;
}

BoolBin.prototype.setBP = function(bp) {
    this.config.bp = bp;
    this.configController.validate();
}

BoolBin.prototype.getSelectedConfig = function(startConfig, endConfig) {
    return [this.config];
}

BoolBin.prototype.getConfig = function() {
    return [this.config];
}

var ref = {
    createControl: function (formulaControl, configController, config, parentControl) {
        return new BoolBin(formulaControl, configController, config, parentControl);
    },
    createConfig: function () {
        return {type: BlockType.BOOLBIN, bp: 'AND', left: CContainer.createConfig(), right: CContainer.createConfig() };
    }
}

module.exports = ref;