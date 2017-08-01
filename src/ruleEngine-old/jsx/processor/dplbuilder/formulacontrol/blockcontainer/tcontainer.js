var BlockType = require('./../blocktype/blocktype');

function TrashContainer(formulaControl, config) {
    this.formulaControl = formulaControl;
    this.config = config;
    this.parentControl = null;
}

TrashContainer.prototype.compare = function(control) {
    return this.config == control.config;
}

TrashContainer.prototype.set = function(config) {
    if(this.config.container.length > 20)
        this.config.container.splice(0, 1);
    this.config.container.push(config);
}

TrashContainer.prototype.remove = function(config) {
}

var ref = {
    createControl: function (formulaControl, config) {
        return new TrashContainer(formulaControl, config);
    },
    createConfig: function () {
        return { type: BlockType.TCONTAINER, container: [] };
    }
}

module.exports = ref;