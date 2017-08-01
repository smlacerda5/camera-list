var KeyType = require('./keytype');

function KeyActionHandler(dplBuilder) {
    this.dplBuilder = dplBuilder;
    this.keyState = KeyType.NONE;
    this.onFocus = false;
    this.fired = false;
    this.keyDownListener = this.keyDownListener.bind(this);
    this.keyUpListener = this.keyUpListener.bind(this);
    window.addEventListener('keydown', this.keyDownListener);
    window.addEventListener('keyup', this.keyUpListener);
    this.CTRLKey = navigator.platform.toUpperCase().indexOf('MAC')>=0 ? 91 : 17;
}

KeyActionHandler.prototype.keyDownListener = function(e) {
    switch (e.keyCode) {
        case this.CTRLKey:
            this.keyState = KeyType.CTRL;
            this.dplBuilder.dataControl.update();
            break;
        case 16:
            this.keyState = KeyType.SHIFT;
            this.dplBuilder.dataControl.update();
            break;
        case 8:
            if (!this.onFocus && !this.fired) {
                this.deleteAction();
                this.fired = true;
            }
            break;
        case 67:
            if (!this.onFocus && this.keyState === KeyType.CTRL && !this.fired) {
                this.copyAction();
                this.fired = true;
            }
            break;
        case 88:
            if (!this.onFocus && this.keyState === KeyType.CTRL && !this.fired) {
                this.cutAction();
                this.fired = true;
            }
            break;
        case 86:
            if (!this.onFocus && this.keyState === KeyType.CTRL && !this.fired) {
                this.pasteAction();
                this.fired = true;
            }
            break;
        default:
            break;
    }
}

KeyActionHandler.prototype.keyUpListener = function(e) {
    this.fired = false;
    if (e.keyCode === this.CTRLKey || e.keyCode === 16) {
        this.keyState = KeyType.NONE;
        this.dplBuilder.dataControl.update();
    }
}

KeyActionHandler.prototype.selectNode = function(control) {
    switch (this.keyState) {
        case KeyType.NONE:
            this.dplBuilder.configController.selectSingleNode(control);
            break;
        case KeyType.CTRL:
            this.dplBuilder.configController.selectMultiNode(control);
            break;
        case KeyType.SHIFT:
            this.dplBuilder.configController.selectMultiArea(control);
            break;
        default:
            break;
    }
}

KeyActionHandler.prototype.copyAction = function() {
    this.dplBuilder.configController.setConfigList();
}

KeyActionHandler.prototype.cutAction = function() {
    this.dplBuilder.configController.setConfigList();
    this.dplBuilder.configController.popLeafControl();
}

KeyActionHandler.prototype.pasteAction = function() {
    this.dplBuilder.configController.pasteAction();
}

KeyActionHandler.prototype.deleteAction = function() {
    this.dplBuilder.configController.deleteAction();
}

KeyActionHandler.prototype.clearKeyState = function() {
    this.keyState = KeyType.NONE;
}

KeyActionHandler.prototype.removeListener = function() {
    window.removeEventListener('keydown', this.keyDownListener);
    window.removeEventListener('keyup', this.keyUpListener);
}

module.exports = KeyActionHandler;