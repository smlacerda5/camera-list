// note : models
var DataType = require('./data/datatype');
var FuncRule = require('./data/funcrule');
var StatusRule = require('./data/statusrule');
var DPL = require('./data/dpl');
var History = require('./data/history');

// note : data control
var DataControl = require('./datacontrol/datacontrol');

// note : formula control
var TContainer = require('./formulacontrol/blockcontainer/tcontainer');
var Dummy = require('./formulacontrol/dummy');
var Value = require('./formulacontrol/value');
var Attribute = require('./formulacontrol/attribute');
var Timeline = require('./formulacontrol/timeline');
var configController = require('./formulacontrol/configcontroller/configcontroller');

// note : format control
var From = require('./formatcontrol/from');
var Select = require('./formatcontrol/select');

// note : tools
var JsonTools = require('../util/jsontools');

function DPLBuilder(updateCallback, detailData, clipboard) {
    this.initializeConfig(detailData);
    // note : data model
    this.datatype = new DataType();
    this.funcrule = new FuncRule();
    this.statusRule = new StatusRule();
    this.dpl = new DPL(detailData.ModuleConfig, this.statusRule);
    this.history = new History(detailData.Name);

    // note : communicator
    this.dataControl = new DataControl(updateCallback, detailData, this.datatype, this.funcrule, this.statusRule, this.history, this.dpl);

    // note : format control
    this.formatControl = {
        from: new From(this.dpl, this.dataControl),
        select: new Select(this.dpl, this.dataControl)
    }

    // note : formula control
    this.trashConfig = TContainer.createConfig();
    this.dummyControl = new Dummy();
    this.timelineControl = new Timeline(this.dataControl, this.history, this.dpl);
    this.formulaControl = this.dummyControl;
    this.configController = new configController({}, this.dataControl, this.trashConfig, clipboard);

    var now = new Date().getTime();
    this.timelineControl.updateRange(now - 3600000 * 2, now + 3600000 * 2);
}

DPLBuilder.prototype.initializeConfig = function(detailData) {
    var moduleConfig = detailData.ModuleConfig;
    if(moduleConfig.Query == null) moduleConfig.Quiery = {};
    if(moduleConfig.Object == null) moduleConfig.Object = {};
    if(moduleConfig.Metric == null) moduleConfig.Metric = {};
    if(moduleConfig.UI == null) moduleConfig.UI = { Config: { from: {}, where: [], attribute: {}, value: {} }};
}

DPLBuilder.prototype.getProcessorName = function() {
    return this.dataControl.detailData.Name;
}

DPLBuilder.prototype.getDetailData = function() {
    return this.dataControl.getConfig();
}

DPLBuilder.prototype.selectFormula = function(type, path) {
    switch (type) {
        case 'value':
            this.formulaControl = new Value(this.datatype, this.funcrule, type, path);
            this.configController.setConfig(JsonTools.get(this.dpl.config.select, path).value);
            break;
        case 'attribute':
            this.formulaControl = new Attribute(this.dataControl, this.statusRule, path, JsonTools.get(this.dpl.config.select, path).attribute);
            this.configController.setConfig(JsonTools.get(this.dpl.config.select, path).attribute);
            break;
        case 'condition':
            this.formulaControl = new Value(this.datatype, this.funcrule, type, []);
            this.configController.setConfig(this.dpl.config.condition);
            break;
        case 'timeline':
            this.formulaControl = this.timelineControl;
            break;
        default:
            this.formulaControl = this.dummyControl;
            break;
    }
    this.dataControl.update();
}

module.exports = DPLBuilder;
