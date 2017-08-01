var BlockType = require('./../blocktype/blocktype');

function CContainer(formulaControl, configController, config, parentControl) {
    this.formulaControl = formulaControl;
    this.configController = configController;
    this.config = config;
    this.parentControl = parentControl;
    this.path = this.parentControl ? Object.assign([], this.parentControl.path) : [];
    this.path.push(this);
}

CContainer.prototype.compare = function(control) {
    return this.config == control.config;
}

CContainer.prototype.set = function(config) {
    if(config.type == BlockType.BOOLBIN || config.type == BlockType.BOOLCOMP) {
        if(this.config.container != null) {
            if(config.left.container != null)
                this.configController.trashControl.set(config.left.container);
            if(config.type == BlockType.BOOLCOMP) return;
            config.left.container = this.config.container;
        }

        this.config.container = config;
        this.configController.validate();
    }
}

CContainer.prototype.replace = function(oldConfig, newConfig) {
    this.config.container = newConfig;
    this.configController.validate();
}

CContainer.prototype.remove = function(config) {
    if(this.config.container == config) {
        this.config.container = null;
        this.configController.validate();
    }
}

CContainer.prototype.getConfig = function() {
    if (!this.config.container) return [];
    return [this.config.container];
}

var ref = {
    createControl: function (formulaControl, configController, config, parentControl) {
        return new CContainer(formulaControl, configController, config, parentControl);
    },
    createConfig: function () {
        return { type: BlockType.CCONTAINER, container: null };
    }
}

module.exports = ref;