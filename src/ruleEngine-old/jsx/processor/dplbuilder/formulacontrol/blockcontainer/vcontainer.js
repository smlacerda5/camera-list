var BlockType = require('./../blocktype/blocktype');

function VContainer(formulaControl, configController, config, parentControl) {
    this.formulaControl = formulaControl;
    this.configController = configController;
    this.config = config;
    this.parentControl = parentControl;
    this.path = this.parentControl ? Object.assign([], this.parentControl.path) : [];
    this.path.push(this);
}

VContainer.prototype.compare = function(control) {
    return this.config == control.config;
}

VContainer.prototype.set = function(config) {
    this.config.container.push(config);
}

VContainer.prototype.pushAt = function(targetConfig, newConfig) {
    var index = this.config.container.indexOf(targetConfig);
    if(index != -1) this.config.container.splice(index, 0, newConfig);
    this.configController.validate();
}

VContainer.prototype.replace = function(oldConfig, newConfig) {
    var index = this.config.container.indexOf(oldConfig);
    if(index != -1) this.config.container[index] = newConfig;
    this.configController.validate();
}

VContainer.prototype.remove = function(config) {
    var index = this.config.container.indexOf(config);
    if(index != -1) this.config.container.splice(index, 1);
}

VContainer.prototype.getSelectedConfig = function(startConfig, endConfig) {
    var flag = 0;
    var selectedList = [];
    for (var i = 0; i < this.config.container.length; i++) {
        if(this.config.container[i] === startConfig || this.config.container[i] === endConfig) flag++;
        if(flag >= 1) selectedList.push(this.config.container[i]);
        if(flag === 2) break;
    }
    return selectedList;
}

VContainer.prototype.getConfig = function() {
    return this.config.container;
}

var ref = {
    createControl: function (formulaControl, configController, config, parentControl) {
        return new VContainer(formulaControl, configController, config, parentControl);
    },
    createConfig: function () {
        return { type: BlockType.VCONTAINER, container: [] };
    }
}

module.exports = ref;