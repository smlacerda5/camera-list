function Value(datatype, funcrule, type, path) {
    this.datatype = datatype;
    this.funcrule = funcrule;

    this.type = type;
    this.path = path;
}

Value.prototype.getFunctionList = function() {
    return Object.keys(this.funcrule.config);
}

Value.prototype.getFunctionParamCount = function(name) {
    return this.funcrule.config[name];
}

Value.prototype.getCastList = function() {
    return Object.keys(this.datatype.config);
}

Value.prototype.getCastValue = function(name) {
    return this.datatype.config[name];
}

Value.prototype.getCastName = function(value) {
    for(var key in this.datatype.config)
        if(this.datatype.config[key] == value)
            return key;
    for(var k in this.datatype.config) return k;
}

module.exports = Value;
