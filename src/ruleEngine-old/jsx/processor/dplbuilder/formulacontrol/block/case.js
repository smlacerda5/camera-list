var BlockType = require('./../blocktype/blocktype');
var VContainer = require('./../blockcontainer/vcontainer');
var CContainer = require('./../blockcontainer/ccontainer');

function Case(formulaControl, configController, config, parentControl) {
    this.formulaControl = formulaControl;
    this.configController = configController;
    this.config = config;
    this.parentControl = parentControl;
    this.path = Object.assign([], this.parentControl.path);
    this.path.push(this);
}

Case.prototype.compare = function(control) {
    return this.config == control.config;
}

Case.prototype.set = function(config) {
    this.parentControl.replace(this.config, config);
    this.configController.trashControl.set(this.config);
}

Case.prototype.pushBefore = function(config) {
    this.parentControl.pushAt(this.config, config);
}

Case.prototype.pop = function() {
    this.parentControl.remove(this.config);
    return this.config;
}

Case.prototype.replace = function(oldConfig, newConfig) {
}

Case.prototype.getOP = function() {
    return this.config.op;
}

Case.prototype.setOP = function(op) {
    this.config.op = op;
    this.configController.validate();
}

Case.prototype.addWhenThen = function() {
    this.config.whenthen.push({when: CContainer.createConfig(), then: VContainer.createConfig()});
}

Case.prototype.delWhenThen = function(index) {
    this.config.whenthen.splice(index, 1);
    this.configController.validate();
}

Case.prototype.getSelectedConfig = function(startConfig, endConfig) {
    return [this.config];
}

Case.prototype.getConfig = function() {
    return [this.config];
}

var ref = {
    createControl: function (formulaControl, configController, config, parentControl) {
        return new Case(formulaControl, configController, config, parentControl);
    },
    createConfig: function () {
        return {
            type: BlockType.CASE,
            op: '+',
            whenthen: [{when: CContainer.createConfig(), then: VContainer.createConfig()}],
            elsethen: VContainer.createConfig() };
    }
}

module.exports = ref;