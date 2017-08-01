
function DataType() {
    this.config = {};
}

DataType.prototype.update = function(config) {
    this.config = config;
}

module.exports = DataType;