
function History(name) {
    this.Name = name;
    this.data = { 'merged': false, 'output': { 'name': this.Name, 'data': [] }, 'input': [] };
    this.dataStart = Number.MAX_VALUE;
    this.dataEnd = Number.MIN_VALUE;

    this.dataStartLimit = Number.MAX_VALUE;
    this.dataEndLimit = Number.MIN_VALUE;
    this.dataRangeLimit = Number.MAX_VALUE;
}

History.prototype.generateNormalData = function(output, input, config) {
    var configLength = config.length;
    for(var i in config) {
        var c = config[configLength - i - 1];
        output.data.push({'time': new Date(c.timestamp), 'success': c.success});

        var r = c.reference;
        for(var rk in r) {
            if(rk in input) input[rk].data.push({'time': new Date(r[rk].timestamp) });
            else input[rk] = { 'name': rk, 'data': [ {'time': new Date(r[rk].timestamp) } ] };
        }
    }
}

History.prototype.generateMergedData = function(output, input, config) {
    var start = config[config.length - 1];
    var end = config[0];
    output.data.push({'time': new Date(start.timestamp), 'success': start.timestamp});
    output.data.push({'time': new Date(end.timestamp), 'success': end.timestamp});

    var configLength = config.length;
    for(var i in config) {
        var r = config[configLength - i - 1].reference;
        for(var rk in r) {
            var inputNode = null;
            if(rk in input) inputNode = input[rk];
            else input[rk] = inputNode = { 'name': rk, 'data': [ ] };

            if(inputNode.data.length <= 1) inputNode.data.push({'time': new Date(r[rk].timestamp)});
            else inputNode.data[1] = {'time': new Date(r[rk].timestamp)};
        }
    }

    for(var i in input) {
        var inputNode = input[i];
        inputNode.data[0].time = new Date(inputNode.data[0].time);
        inputNode.data[1].time = new Date(inputNode.data[1].time);
    }

    console.log(input);
}

History.prototype.update = function(fromConfig, config) {
    var output = { 'name': this.Name, 'data': [] };
    var input = {};
    var merged = false;

    for(var from in fromConfig) {
        var tableName = fromConfig[from].name;
        input[tableName] = { 'name': tableName, 'data': [] };
    }

    if(config.length > 500) {
        this.generateMergedData(output, input, config);
        merged = true;
    }
    else {
        this.generateNormalData(output, input, config);
    }

    var newData = { 'merged': merged, 'output': output, input: [] };
    for(var k in input) newData.input.push(input[k]);
    this.data = newData;
}

module.exports = History;
