var Common = require('./common');

function Horizontal() {
}

Horizontal.prototype.Align = function(dataContainer, radius) {
    var diameter = radius << 1;
    var doubleDiameter = diameter << 1;
    var alignedStruct = Common.alignByRef(dataContainer);

    var count = Math.ceil(Math.sqrt(alignedStruct[0].length));
    var currentTop = diameter - ((count * doubleDiameter) >> 1);
    var currentLeft = -doubleDiameter;

    var index = 0;
    for(var key in alignedStruct[0]) {
        var target = alignedStruct[0][key];
        target.x = currentLeft;
        target.y = index * doubleDiameter + currentTop;
        target.r = radius;

        if(index++ >= count - 1) {
            currentLeft -= doubleDiameter;
            index = 0;
        }
    }

    for(var i = 1, iLen = alignedStruct.length; i < iLen; i++) {
        var currentTargetGroup = alignedStruct[i];
        currentLeft = doubleDiameter * (i - 1);
        currentTop = diameter - ((currentTargetGroup.length * doubleDiameter) >> 1);

        for(var j = 0, jLen = currentTargetGroup.length; j < jLen; j++) {
            var currentTarget = currentTargetGroup[j];
            currentTarget.x = currentLeft;
            currentTarget.y = j * doubleDiameter + currentTop;
            currentTarget.r = radius;
        }
    }
}

var instance = new Horizontal();

module.exports = instance;