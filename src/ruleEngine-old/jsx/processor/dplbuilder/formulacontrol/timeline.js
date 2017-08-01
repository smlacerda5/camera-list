function Timeline(dataControl, history, dpl) {
    this.dataControl = dataControl;
    this.history = history;
    this.dpl = dpl;

    this.type = 'timeline';
    this.path = [];
}

Timeline.prototype.getData = function() {
    var output = this.dpl.data.output;
    if(output.meta && output.meta.timestamp)
      this.history.data.output.point = new Date(output.meta.timestamp);

    for(var k in this.history.data.input) {
        var input = this.history.data.input[k];
        input.point = null;
        if(input.name in this.dpl.data.input) {
            var inputData = this.dpl.data.input[input.name];
            if(inputData.meta && inputData.meta.timestamp)
              input.point = new Date(inputData.meta.timestamp);
        }
    }

    return this.history.data;
}

Timeline.prototype.getInitialRange = function() {
    var range = this.history.dataEnd - this.history.dataStart;
    var initialGap = range / 3;
    return [ this.history.dataStart + initialGap, this.history.dataEnd - initialGap ];
}

Timeline.prototype.updateRange = function(dataStart, dataEnd) {
    if(dataEnd < dataStart) return;
    var range = dataEnd - dataStart;

    if((this.history.dataStartLimit > dataStart || this.history.dataEndLimit < dataEnd) || this.history.dataRangeLimit > range)
    {
        var halfRange = range / 2;
        this.history.dataStart = dataStart - range;
        this.history.dataEnd = dataEnd + range;
        this.history.dataStartLimit = this.history.dataStart + halfRange;
        this.history.dataEndLimit = this.history.dataEnd - halfRange;
        this.history.dataRangeLimit = halfRange;
        this.dataControl.updateHistory();
    }
}

Timeline.prototype.updateTimestamp = function(timestamp) {
    this.dataControl.validate(timestamp);
}

module.exports = Timeline;
