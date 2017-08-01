
function FuncRule() {
    this.config = {};
}

FuncRule.prototype.update = function(config) {
    this.config = config;
}

module.exports = FuncRule;