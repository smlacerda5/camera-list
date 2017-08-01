var BlockType = require('./../blocktype/blocktype');

function Ref(formulaControl, configController, config, parentControl) {
    this.formulaControl = formulaControl;
    this.configController = configController;
    this.config = config;
    this.parentControl = parentControl;
    this.path = Object.assign([], this.parentControl.path);
    this.path.push(this);
}

Ref.prototype.compare = function(control) {
    return this.config == control.config;
}

Ref.prototype.set = function(config) {
    this.parentControl.replace(this.config, config);
    this.configController.trashControl.set(this.config);
}

Ref.prototype.pushBefore = function(config) {
    this.parentControl.pushAt(this.config, config);
}

Ref.prototype.pop = function() {
    this.parentControl.remove(this.config);
    return this.config;
}

Ref.prototype.replace = function(oldConfig, newConfig) {

}

Ref.prototype.getOP = function() {
    return this.config.op;
}

Ref.prototype.setOP = function(op) {
    this.config.op = op;
    this.configController.validate();
}

Ref.prototype.getPath = function() {
    return this.config.path.join('.');
}

Ref.prototype.setPath = function(pathString) {
    this.config.path = pathString.split('.');
    this.configController.validate();
}

Ref.prototype.getConfig = function() {
    return [this.config];
}

var instance = {
    createControl: function (formulaControl, configController, config, parentControl) {
        return new Ref(formulaControl, configController, config, parentControl);
    },
    createConfig: function (tableID, path) {
        return {type: BlockType.REF, op: '+', tableID: tableID, path: path};
    }
}

module.exports = instance;