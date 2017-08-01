var MultiSlider = require("babel?presets=react!./MultiSlider");
var uncontrollable = require("uncontrollable");
module.exports = uncontrollable(MultiSlider, { values: "onChange" });
