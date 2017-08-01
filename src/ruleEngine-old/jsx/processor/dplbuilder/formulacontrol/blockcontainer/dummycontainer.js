
function DummyContainer(config) {
    this.formulaControl = null;
    this.config = config;
    this.parentControl = null;
}

DummyContainer.prototype.compare = function(control) {
    return this.config == control.config;
}

DummyContainer.prototype.set = function(config) {
}

DummyContainer.prototype.remove = function(config) {
}

var instance = {
    createControl: function (config) {
        return new DummyContainer(config);
    },
    createConfig: function () {
        return {};
    }
}

module.exports = instance;