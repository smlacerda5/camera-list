var Common = require('./common');

function Circular() {
}

Circular.prototype.Align = function(dataContainer, radius) {
    var diameter = radius << 1;
    var alignedStruct = Common.alignByRef(dataContainer);

    var centerWidth = Math.ceil(Math.sqrt(alignedStruct[0].length));
    var centerHeight = Math.ceil(alignedStruct[0].length / centerWidth);
    var centerLeft = 0 - ((centerWidth * diameter) >> 1);
    var centerTop = 0 - ((centerHeight * diameter) >> 1);

    var currentTop = centerTop;
    var currentLeft = centerLeft;

    var index = 0;
    for(var key in alignedStruct[0]) {
        var target = alignedStruct[0][key];
        target.x = currentLeft + radius;
        target.y = currentTop + radius;
        target.r = radius;

        if (index++ >= centerWidth - 1) {
            currentTop += diameter;
            currentLeft = centerLeft;
            index = 0;
        }
        else {
            currentLeft += diameter;
        }
    }

    var wSeed = centerLeft + radius;
    var hSeed = centerTop + radius;
    var rStep = diameter + radius;
    var rhStep = rStep / 2;
    var rhhStep = rhStep / 2;
    var currentRadius = Math.sqrt((wSeed * wSeed + hSeed * hSeed)) + rStep;
    var currentThetaStart = Math.PI / 2;
    var thetaStep = Math.PI / 45;
    var circleGroup = [];

    for(var i = 1, iLen = alignedStruct.length; i < iLen; i++) {
        var currentTargetGroup = alignedStruct[i];

        // note : calculate limit radius
        var theta = (Math.PI * 2) / currentTargetGroup.length;
        var limitRadius = rhhStep / Math.sin(theta / 4);
        if(currentRadius < limitRadius) currentRadius = limitRadius;
        else theta = Math.asin(rhhStep / currentRadius) * 4;

        for(var j = 0, jLen = currentTargetGroup.length; j < jLen; j++) {
            var currentTarget = currentTargetGroup[j];

            var objectTheta = currentThetaStart - (theta * j);
            currentTarget.x = Math.cos(objectTheta) * currentRadius;
            currentTarget.y = -1 * Math.sin(objectTheta) * currentRadius;
            currentTarget.r = radius;
        }

        circleGroup.push(currentRadius);
        currentRadius += rStep;
        currentThetaStart -= thetaStep;
    }

    dataContainer.extra["circle"] = circleGroup;
}

var instance = new Circular();

module.exports = instance;