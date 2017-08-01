var BlockType = require('./../blocktype/blocktype');
var VContainer = require('./../blockcontainer/vcontainer');

function PostRef(formulaControl, configController, config, parentControl) {
    this.formulaControl = formulaControl;
    this.configController = configController;
    this.config = config;
    this.parentControl = parentControl;
    this.path = Object.assign([], this.parentControl.path);
    this.path.push(this);
}

PostRef.prototype.compare = function(control) {
    return this.config == control.config;
}

PostRef.prototype.set = function(config) {
    this.parentControl.replace(this.config, config);
    this.configController.trashControl.set(this.config);
}

PostRef.prototype.pushBefore = function(config) {
    this.parentControl.pushAt(this.config, config);
}

PostRef.prototype.pop = function() {
    this.parentControl.remove(this.config);
    return this.config;
}

PostRef.prototype.replace = function(oldConfig, newConfig) {

}

PostRef.prototype.getOP = function() {
    return this.config.op;
}

PostRef.prototype.setOP = function(op) {
    this.config.op = op;
    this.configController.validate();
}

PostRef.prototype.getPath = function() {
    return this.config.path.join('.');
}

PostRef.prototype.setPath = function(pathString) {
    this.config.path = pathString.split('.');
    this.configController.validate();
}

PostRef.prototype.getConfig = function() {
    return [this.config];
}

var instance = {
    createControl: function (formulaControl, configController, config, parentControl) {
        return new PostRef(formulaControl, configController, config, parentControl);
    },
    createConfig: function () {
        return {type: BlockType.POSTREF, op: '+', left: VContainer.createConfig(), path: []};
    }
}

module.exports = instance;