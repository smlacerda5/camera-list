var Common = require('./common');

function Vertical() {
}

Vertical.prototype.Align = function(dataContainer, radius) {
    var diameter = radius << 1;
    var doubleDiameter = diameter << 1;
    var alignedStruct = Common.alignByRef(dataContainer);

    var count = Math.ceil(Math.sqrt(alignedStruct[0].length));
    var currentTop = doubleDiameter;
    var currentLeft = diameter - ((count * doubleDiameter) >> 1);

    var index = 0;
    for(var key in alignedStruct[0]) {
        var target = alignedStruct[0][key];
        target.x = index * doubleDiameter + currentLeft;
        target.y = currentTop;
        target.r = radius;

        if(index++ >= count - 1) {
            currentTop += doubleDiameter;
            index = 0;
        }
    }

    for(var i = 1, iLen = alignedStruct.length; i < iLen; i++) {
        var currentTargetGroup = alignedStruct[i];
        currentLeft = diameter - ((currentTargetGroup.length * doubleDiameter) >> 1);
        currentTop = doubleDiameter * (i - 1) * -1;

        for(var j = 0, jLen = currentTargetGroup.length; j < jLen; j++) {
            var currentTarget = currentTargetGroup[j];
            currentTarget.x = j * doubleDiameter + currentLeft;
            currentTarget.y = currentTop;
            currentTarget.r = radius;
        }
    }
}

var instance = new Vertical();

module.exports = instance;