var DummyContainer = require('../blockcontainer/dummycontainer');
var SelectedNode = require('./selectednode');
var KeyType = require('../editevent/keytype');
var BlockType = require('./../blocktype/blocktype');
var JsonTools = require('../../../util/jsontools');
var TrashContainer = require('../blockcontainer/tcontainer');
var BlockTool = require('../blocktype/blocktool');
function configController(config, dataControl, trashConfig, clipboard) {
    this.config = config;
    this.rootNode = new SelectedNode(new DummyContainer.createControl(this.config));
    this.leafControl = [this.rootNode.control];
    this.firstOperandNode = this.rootNode;
    this.lastOperandNode = this.rootNode;
    this.dataControl = dataControl;
    this.dragControl = [];
    this.clipboard = clipboard;
    this.trashControl = new TrashContainer.createControl(this, trashConfig);
}

configController.prototype.validate = function () {
    this.dataControl.validate();
}

configController.prototype.selectSingleNode = function(control) {
    this.rootNode = new SelectedNode(control.path[0]);
    var currentNode = this.rootNode;
    for (var i = 1; i < control.path.length; i++) {
        var newNode = new SelectedNode(control.path[i]);
        currentNode.child.push(newNode);
        currentNode = newNode;
    }
    this.leafControl = [currentNode.control];
    this.firstOperandNode = currentNode;
    this.lastOperandNode = currentNode;
    this.dataControl.update();
}

configController.prototype.isExist = function(control) {
    for(var i = 0; i < this.leafControl.length; i++) {
        if (control.compare(this.leafControl[i])) {
            return i;
        }
    }
    return -1;
}

configController.prototype.setConfig = function(config) {
    this.config = config;
    this.rootNode = new SelectedNode(new DummyContainer.createControl(config));
    this.leafControl = [this.rootNode.control];
    this.firstOperandNode = this.rootNode;
    this.lastOperandNode = this.rootNode;
    this.dragControl = [];
    this.dataControl.update();
}

configController.prototype.initialize = function() {
    this.rootNode.child = [];
    this.leafControl = [this.rootNode.control];
    this.firstOperandNode = this.rootNode;
    this.dragControl = [];
}

configController.prototype.isDragged = function(control) {
    for(var i = 0; i < this.dragControl.length; i++) {
        if (control.compare(this.dragControl[i])) {
            return i;
        }
    }
    return -1;
}

configController.prototype.selectByConfig = function(config) {
    var newControl = new DummyContainer.createControl(config);
    var newPath = Object.assign([], this.leafControl[0].path);
    newPath.push(newControl);
    newControl.path = newPath;
    this.selectSingleNode(newControl);
}

configController.prototype.selectMultiNode = function(control) {
    var firstOperandType = this.firstOperandNode.control.config.type;
    var otherOperandType = control.config.type
    var typeCheck = (firstOperandType === BlockType.CCONTAINER || firstOperandType === BlockType.BOOLBIN || firstOperandType === BlockType.BOOLCOMP) === (otherOperandType === BlockType.CCONTAINER || otherOperandType === BlockType.BOOLBIN || otherOperandType === BlockType.BOOLCOMP)
    if (!typeCheck) return;
    var currentNode = this.rootNode;
    var beforeNode = currentNode;
    var flag = 0;
    if (!control.path[0].compare(this.rootNode.control) || this.leafControl[0].compare(this.rootNode.control)) return;
    var i = 1;
    for (i; i < control.path.length; i++) {
        flag = 0;
        var targetIndex = this.leafControl.findIndex(function (control) {
            return control.compare(currentNode.control);
        });
        if (currentNode.child.length === 0 && targetIndex > -1) return;
        for(var j = 0; j < currentNode.child.length; j++) {
            if (control.path[i].compare(currentNode.child[j].control)) {
                flag = 1;
                beforeNode = currentNode;
                currentNode = currentNode.child[j];
                break;
            }
        }
        if (flag === 0) break;
    }
    if (i === control.path.length) {
        if (currentNode.child.length === 0) {
            var targetIndex = this.leafControl.findIndex(function (control) {
                return control.compare(currentNode.control);
            });
            var nodeIndex = beforeNode.child.findIndex(function (node) {
                return node.control.compare(currentNode.control);
            });
            if (targetIndex >= 0 && nodeIndex >= 0) {
                this.leafControl.splice(targetIndex, 1);
                beforeNode.child.splice(nodeIndex, 1);
                if(this.leafControl.length === 0) this.leafControl = [this.rootNode.control];
            }
        }
        else {
            this.leafControl.push(currentNode.control);
            this.removeLeafNode(currentNode);
            currentNode.child = [];
        }
    }
    else {
        for(i; i < control.path.length; i++) {
            var newNode = new SelectedNode(control.path[i]);
            currentNode.child.push(newNode);
            currentNode = newNode;
        }
        this.leafControl.push(currentNode.control);
    }
    this.lastOperandNode = currentNode;
    this.dataControl.update();
}

configController.prototype.selectMultiArea = function(control) {
    var index = -1;
    var path = control.path;
    var self = this;
    this.firstOperandNode.control.path.forEach(function (p, i) {
        if (path.length <= i || !p.compare(path[i])) return;
        index++;
    });
    this.leafControl = [];
    var selectedConfig = (this.firstOperandNode.control.path[index+1] &&  path[index+1]) ?
    path[index].getSelectedConfig(this.firstOperandNode.control.path[index+1].config, path[index+1].config) : [path[index].config];
    this.lastOperandNode = (this.firstOperandNode.control.path[index+1] && path[index+1]) ? new SelectedNode(path[index+1]) : new SelectedNode(path[index]);
    this.rootNode = new SelectedNode(control.path[0]);
    var currentNode = this.rootNode;
    for(var i = 1; i < index; i++) {
        var newNode = new SelectedNode(control.path[i]);
        currentNode.child.push(newNode);
        currentNode = newNode;
    }
    selectedConfig.forEach(function (config) {
        var newNode = new SelectedNode(new DummyContainer.createControl(config));
        currentNode.child.push(newNode);
        self.leafControl.push(newNode.control);
    });
    this.dataControl.update();
}

configController.prototype.removeLeafNode = function(currentNode) {
    var self = this;
    if (currentNode.child.length === 0) {
        var targetIndex = this.leafControl.findIndex(function (control) {
            return control.compare(currentNode.control);
        });
        if (targetIndex >= 0) this.leafControl.splice(targetIndex, 1);
    }
    else currentNode.child.forEach(function (node){
        self.removeLeafNode(node);
    });
}

configController.prototype.setControl = function(control, i) {
    this.leafControl.splice(i, 1);
    this.leafControl.push(control);
    if (control.compare(this.lastOperandNode.control))
        this.lastOperandNode.control = control;
    if (control.compare(this.firstOperandNode.control))
        this.firstOperandNode.control = control;
}

configController.prototype.setDragControl = function(control) {
    if (this.isExist(control) >= 0) this.dragControl = this.leafControl;
    else this.dragControl = [control];
}

configController.prototype.setConfigList = function() {
    var configList = [];
    this.leafControl.forEach(function(control) {
        configList = configList.concat(JsonTools.deepClone(control.getConfig()));
    });
    this.clipboard.configList = configList;
}

configController.prototype.pasteAction = function() {
    if (this.leafControl.length === 0 || this.clipboard.configList.length === 0) return;
    if(BlockTool.getAssignableList(this.firstOperandNode.control.config).indexOf(this.clipboard.configList[0].type) < 0) return;
    var self = this;
    for(var i = 0; i < this.leafControl.length; i++) {
        if(this.leafControl[i].pop && !this.leafControl[i].compare(this.firstOperandNode.control)) {
            self.trashControl.set(this.leafControl[i].pop());
        }
    }
    var list = []
    var targetNode = null;
    if(this.firstOperandNode.control.pop) {
        targetNode = this.firstOperandNode;
        this.selectSingleNode(this.firstOperandNode.control.parentControl);
    }
    if (self.firstOperandNode.control.config.type === BlockType.CCONTAINER) {
        var newConfig = null;
        for (var i = 0; i < this.clipboard.configList.length; i++) {
            if (i > 0 && this.clipboard.configList[i].type === BlockType.BOOLCOMP) break;
            newConfig = JsonTools.deepClone(this.clipboard.configList[i]);
            targetNode ? targetNode.control.set(newConfig) :
                         self.firstOperandNode.control.set(newConfig);
        }
        var newNode = new SelectedNode(new DummyContainer.createControl(newConfig));
        this.firstOperandNode.child.push(newNode);
        list = [newNode.control];
        targetNode && targetNode.control.pop();
    }
    else {
        this.clipboard.configList.forEach(function (config) {
            var newConfig = JsonTools.deepClone(config);
            targetNode ? targetNode.control.pushBefore(newConfig) :
                         self.firstOperandNode.control.set(newConfig);
            var newNode = new SelectedNode(new DummyContainer.createControl(newConfig));
            self.firstOperandNode.child.push(newNode);
            list.push(newNode.control);
        });
        targetNode && self.trashControl.set(targetNode.control.pop());
    }
    this.leafControl = list;
    this.lastOperandNode = this.firstOperandNode.child[this.firstOperandNode.child.length-1];
    this.firstOperandNode = this.firstOperandNode.child[this.firstOperandNode.child.length-1];
    this.validate();
}

configController.prototype.deleteAction = function() {
    var self = this;
    var index = -1;
    if (this.lastOperandNode.control.parentControl && this.lastOperandNode.control.parentControl.config.type === BlockType.VCONTAINER) {
        index = this.lastOperandNode.control.parentControl.config.container.findIndex(function(config) {
            return config === self.lastOperandNode.control.config;
        });
    }
    var targetControl = Object.assign([], this.leafControl);
    targetControl.forEach(function (control) {
        if(control.config.type === BlockType.VCONTAINER) {
            var targetContainer = Object.assign([], control.config.container);
            targetContainer.forEach(function (config) {
                self.trashControl.set(config);
                control.remove(config);
            });
        }
        else if(control.config.type === BlockType.CCONTAINER) {
            if(control.config.container) {
                self.trashControl.set(control.config.container);
                control.remove(control.config.container);
            }
        }
        else self.trashControl.set(control.pop());
    });
    if (index >= 0) {
        index > 0 && index--;
        if (index >= this.lastOperandNode.control.parentControl.config.container.length) index = this.lastOperandNode.control.parentControl.config.container.length - 1;
        if(this.lastOperandNode.control.parentControl.config.container.length > 0) this.selectByConfig(this.lastOperandNode.control.parentControl.config.container[index]);
        else self.selectSingleNode(this.lastOperandNode.control.parentControl);
    }
    else if (this.lastOperandNode.control.parentControl && this.lastOperandNode.control.parentControl.config.type === BlockType.CCONTAINER){
        this.selectSingleNode(this.lastOperandNode.control.parentControl);
    }
    else {
        self.selectSingleNode(this.lastOperandNode.control);
    }
    this.validate();
}

configController.prototype.popLeafControl = function() {
    var self = this;
    var newLeafControl = this.leafControl[0].pop ? this.leafControl[0].parentControl : this.leafControl[0];
    this.leafControl.forEach(function (control) {
        if(control.config.type === BlockType.VCONTAINER) {
            var targetContainer = Object.assign([], control.config.container);
            targetContainer.forEach(function (config) {
                control.remove(config);
            });
        }
        else if(control.config.type === BlockType.CCONTAINER) control.remove(control.config.container);
        else control.pop();
    });
    this.selectSingleNode(newLeafControl);
    this.validate();
}

configController.prototype.assignableCheck = function(control) {
    var operandPath = control.path;
    var self = this;
    for(var j = 0; j < this.dragControl.length; j++) {
        var flag = 0;
        for(var i = 0; i < this.dragControl[j].path.length; i++) {
            if(!operandPath[i]) { flag = 1; break; }
            if(!this.dragControl[j].path[i]) { flag = 1; break; }
            if(!this.dragControl[j].path[i].compare(operandPath[i])) {
                 flag = 1;
                 break;
            }
        }
        if(flag === 0) return false;
    }
    return true;
}

module.exports = configController;