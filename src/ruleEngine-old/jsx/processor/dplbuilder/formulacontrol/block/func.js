var BlockType = require('./../blocktype/blocktype');
var VContainer = require('./../blockcontainer/vcontainer');

function Func(formulaControl, configController, config, parentControl) {
    this.formulaControl = formulaControl;
    this.configController = configController;
    this.config = config;
    this.parentControl = parentControl;
    this.path = Object.assign([], this.parentControl.path);
    this.path.push(this);
}

Func.prototype.compare = function(control) {
    return this.config == control.config;
}

Func.prototype.set = function(config) {
    this.parentControl.replace(this.config, config);
    this.configController.trashControl.set(this.config);
}

Func.prototype.pushBefore = function(config) {
    this.parentControl.pushAt(this.config, config);
}

Func.prototype.pop = function() {
    this.parentControl.remove(this.config);
    return this.config;
}

Func.prototype.replace = function(oldConfig, newConfig) {
}

Func.prototype.getOP = function() {
    return this.config.op;
}

Func.prototype.setOP = function(op) {
    this.config.op = op;
    this.configController.validate();
}

Func.prototype.getFunc = function() {
    return this.config.func;
}

Func.prototype.getSelectedConfig = function(startConfig, endConfig) {
    return [this.config];
}

Func.prototype.setFunc = function(name) {
    this.config.func = name;
    var oldParamCount = this.config.params.length;
    var newParamCount = this.formulaControl.getFunctionParamCount(name);

    if(newParamCount < oldParamCount)
        this.config.params.splice(newParamCount, this.config.params.length);
    else
        for(var i = this.config.params.length; i < newParamCount; i++)
            this.config.params.push(VContainer.createConfig());

    this.configController.validate();
}

Func.prototype.getConfig = function() {
    return [this.config];
}

var instance = {
    createControl: function (formulaControl, configController, config, parentControl) {
        return new Func(formulaControl, configController, config, parentControl);
    },
    createConfig: function () {
        return {type: BlockType.FUNC, op: '+', func: 'SUM', params: [VContainer.createConfig()]};
    }
}

module.exports = instance;