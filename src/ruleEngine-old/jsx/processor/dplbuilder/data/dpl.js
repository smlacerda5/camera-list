var JsonTools = require('../../util/jsontools');
var BlockType = require('../formulacontrol/blocktype/blocktype');
var CContainer = require('../formulacontrol/blockcontainer/ccontainer');

function DPL(moduleConfig, statusRule) {
    this.statusRule = statusRule;
    this.config = {
        from: moduleConfig.UI.Config.from,
        condition: moduleConfig.UI.Config.where,
        select: moduleConfig.UI.Config.select
    };
    this.error = {};
    this.data = {input: {}, output: {}};

    this.initialize();
}

DPL.prototype.initialize = function() {
    // note : check select
    if(this.config.select == null) this.config.select = {};
    if(!('object' in this.config.select)) this.config.select.object = {};
    if(!('name' in this.config.select.object)) this.config.select.object.name = JsonTools.createDefaultVAConfig();
    if(!('properties' in this.config.select.object) || this.config.select.object.properties == null) this.config.select.object.properties = {};
    if(!('health' in this.config.select.object) || this.config.select.object.health == null)  this.config.select.object.health = JsonTools.createDefaultVAConfig();

    // note : check condition
    if(this.config.condition == null || this.config.condition.type != BlockType.CCONTAINER) this.config.condition = CContainer.createConfig();
}

DPL.prototype.getConfig = function () {
    return { select: this.config.select, from: this.config.from, where: this.config.condition };
}

DPL.prototype.getFromConfig = function () {
    return this.config.from;
}

module.exports = DPL;
