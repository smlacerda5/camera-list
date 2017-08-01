var BlockType = require('../../dplbuilder/formulacontrol/blocktype/blocktype');

// note : components (view)
var TContainer = require('./formulanode/container/tcontainer');
var VContainer = require('./formulanode/container/vcontainer');
var CContainer = require('./formulanode/container/ccontainer');
var Null = require('./formulanode/block/null');
var Text = require('./formulanode/block/text');
var Number = require('./formulanode/block/number');
var Cast = require('./formulanode/block/cast');
var Ref = require('./formulanode/block/ref');
var PostRef = require('./formulanode/block/postref');
var Bracket = require('./formulanode/block/bracket');
var Func = require('./formulanode/block/func');
var Case = require('./formulanode/block/case');
var BoolBin = require('./formulanode/block/boolbin');
var BoolComp = require('./formulanode/block/boolcomp');

// note : controls
var DummyContainerControl = require('../../dplbuilder/formulacontrol/blockcontainer/dummycontainer');
var TContainerControl = require('../../dplbuilder/formulacontrol/blockcontainer/tcontainer');
var VContainerControl = require('../../dplbuilder/formulacontrol/blockcontainer/vcontainer');
var CContainerControl = require('../../dplbuilder/formulacontrol/blockcontainer/ccontainer');
var NullControl = require('../../dplbuilder/formulacontrol/block/null');
var TextControl = require('../../dplbuilder/formulacontrol/block/text');
var NumberControl = require('../../dplbuilder/formulacontrol/block/number');
var CastControl = require('../../dplbuilder/formulacontrol/block/cast');
var RefControl = require('../../dplbuilder/formulacontrol/block/ref');
var PostRefControl = require('../../dplbuilder/formulacontrol/block/postref');
var BracketControl = require('../../dplbuilder/formulacontrol/block/bracket');
var FuncControl = require('../../dplbuilder/formulacontrol/block/func');
var CaseControl = require('../../dplbuilder/formulacontrol/block/case');
var BoolBinControl = require('../../dplbuilder/formulacontrol/block/boolbin');
var BoolCompControl = require('../../dplbuilder/formulacontrol/block/boolcomp');

function FormulaFactory() {
    this.dummyContainerControl = DummyContainerControl.createControl(); 
}

FormulaFactory.prototype.createDefault = function(type, dplBuilder) {
    switch(type) {
        case BlockType.TCONTAINER:
            return <TContainer ref={type} key={type} index={0} control={TContainerControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, TContainerControl.createConfig())} dplBuilder={dplBuilder} formulaFactory={this}/>
        case BlockType.VCONTAINER:
            return <VContainer ref={type} key={type} index={0} control={VContainerControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, VContainerControl.createConfig())} dplBuilder={dplBuilder} formulaFactory={this}/>
        case BlockType.CCONTAINER:
            return <CContainer ref={type} key={type} index={0}  control={CContainerControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, CContainerControl.createConfig())} dplBuilder={dplBuilder} formulaFactory={this}/>
        case BlockType.NULL:
            return <Null ref={type} key={type} index={0}  control={NullControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, NullControl.createConfig(), this.dummyContainerControl)} dplBuilder={dplBuilder} formulaFactory={this}/>
        case BlockType.TEXT:
            return <Text ref={type} key={type} index={0}  control={TextControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, TextControl.createConfig(), this.dummyContainerControl)} dplBuilder={dplBuilder} formulaFactory={this}/>
        case BlockType.NUMBER:
            return <Number ref={type} key={type} index={0}  control={NumberControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, NumberControl.createConfig(), this.dummyContainerControl)} dplBuilder={dplBuilder} formulaFactory={this}/>
        case BlockType.CAST:
            return <Cast ref={type} key={type} index={0}  control={CastControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, CastControl.createConfig(), this.dummyContainerControl)} dplBuilder={dplBuilder} formulaFactory={this}/>
        case BlockType.REF:
            return <Ref ref={type} key={type} index={0}  control={RefControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, RefControl.createConfig(), this.dummyContainerControl)} dplBuilder={dplBuilder} formulaFactory={this}/>
        case BlockType.POSTREF:
            return <PostRef ref={type} key={type} index={0}  control={PostRefControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, PostRefControl.createConfig(), this.dummyContainerControl)} dplBuilder={dplBuilder} formulaFactory={this}/>
        case BlockType.BRACKET:
            return <Bracket ref={type} key={type} index={0}  control={BracketControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, BracketControl.createConfig(), this.dummyContainerControl)} dplBuilder={dplBuilder} formulaFactory={this}/>
        case BlockType.FUNC:
            return <Func ref={type} key={type} index={0}  control={FuncControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, FuncControl.createConfig(), this.dummyContainerControl)} dplBuilder={dplBuilder} formulaFactory={this}/>
        case BlockType.CASE:
            return <Case ref={type} key={type} index={0}  control={CaseControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, CaseControl.createConfig(), this.dummyContainerControl)} dplBuilder={dplBuilder} formulaFactory={this}/>
        case BlockType.BOOLBIN:
            return <BoolBin ref={type} key={type} index={0}  control={BoolBinControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, BoolBinControl.createConfig(), this.dummyContainerControl)} dplBuilder={dplBuilder} formulaFactory={this}/>
        case BlockType.BOOLCOMP:
            return <BoolComp ref={type} key={type} index={0}  control={BoolCompControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, BoolCompControl.createConfig(), this.dummyContainerControl)} dplBuilder={dplBuilder} formulaFactory={this}/>
        default:
            return <noscript />
    }
}

FormulaFactory.prototype.create = function(id, index, config, parentControl, dplBuilder, isRoot, keyActionHandler) {
    switch(config.type) {
        case BlockType.TCONTAINER:
            return <TContainer ref={id} key={id} index={index} control={TContainerControl.createControl(dplBuilder.formulaControl, config)} dplBuilder={dplBuilder} formulaFactory={this} isRoot={isRoot}/>
        case BlockType.VCONTAINER:
            return <VContainer ref={id} key={id} index={index} control={VContainerControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, config, parentControl)} dplBuilder={dplBuilder} formulaFactory={this} isRoot={isRoot} keyActionHandler={keyActionHandler}/>
        case BlockType.CCONTAINER:
            return <CContainer ref={id} key={id} index={index} control={CContainerControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, config, parentControl)} dplBuilder={dplBuilder} formulaFactory={this} isRoot={isRoot} keyActionHandler={keyActionHandler}/>
        case BlockType.NULL:
            return <Null ref={id} key={id} index={index} control={NullControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, config, parentControl)} dplBuilder={dplBuilder} formulaFactory={this} keyActionHandler={keyActionHandler}/>
        case BlockType.TEXT:
            return <Text ref={id} key={id} index={index} control={TextControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, config, parentControl)} dplBuilder={dplBuilder} formulaFactory={this} keyActionHandler={keyActionHandler}/>
        case BlockType.NUMBER:
            return <Number ref={id} key={id} index={index} control={NumberControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, config, parentControl)} dplBuilder={dplBuilder} formulaFactory={this} keyActionHandler={keyActionHandler}/>
        case BlockType.CAST:
            return <Cast ref={id} key={id} index={index} control={CastControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, config, parentControl)} dplBuilder={dplBuilder} formulaFactory={this} keyActionHandler={keyActionHandler}/>
        case BlockType.REF:
            return <Ref ref={id} key={id} index={index} control={RefControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, config, parentControl)} dplBuilder={dplBuilder} formulaFactory={this} keyActionHandler={keyActionHandler}/>
        case BlockType.POSTREF:
            return <PostRef ref={id} key={id} index={index} control={PostRefControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, config, parentControl)} dplBuilder={dplBuilder} formulaFactory={this} keyActionHandler={keyActionHandler}/>
        case BlockType.BRACKET:
            return <Bracket ref={id} key={id} index={index} control={BracketControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, config, parentControl)} dplBuilder={dplBuilder} formulaFactory={this} keyActionHandler={keyActionHandler}/>
        case BlockType.FUNC:
            return <Func ref={id} key={id} index={index} control={FuncControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, config, parentControl)} dplBuilder={dplBuilder} formulaFactory={this} keyActionHandler={keyActionHandler}/>
        case BlockType.CASE:
            return <Case ref={id} key={id} index={index} control={CaseControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, config, parentControl)} dplBuilder={dplBuilder} formulaFactory={this} keyActionHandler={keyActionHandler}/>
        case BlockType.BOOLBIN:
            return <BoolBin ref={id} key={id} index={index} control={BoolBinControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, config, parentControl)} dplBuilder={dplBuilder} formulaFactory={this} keyActionHandler={keyActionHandler}/>
        case BlockType.BOOLCOMP:
            return <BoolComp ref={id} key={id} index={index} control={BoolCompControl.createControl(dplBuilder.formulaControl, dplBuilder.configController, config, parentControl)} dplBuilder={dplBuilder} formulaFactory={this} keyActionHandler={keyActionHandler}/>
        default:
            return <noscript />
    }
}

var formulaFactory = new FormulaFactory();

module.exports = formulaFactory;