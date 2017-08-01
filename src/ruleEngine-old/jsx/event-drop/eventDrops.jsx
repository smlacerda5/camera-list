import * as d3 from 'd3/build/d3';

import configurable from 'configurable.js';
import defaultConfig from './config';
import drawer from './drawer';
import zoom from './zoom';
import style from './style.css';

function eventDrops(config = {}) {
    const finalConfiguration = { ...defaultConfig, ...config };
    var dimensions = { width: 0, height: 0 };
    var drawHandler = { Initialize: () => {}, Update: () => {} };
    var scales = { 'x': () => {}, 'yIn': () => {}, 'yOut': () => {} };
    var lastScales = { 'x': () => {}, 'yIn': () => {}, 'yOut': () => {} };

    const yOutScale = data => {
        return d3
            .scaleOrdinal()
            .domain([data.name])
            .range([0]);
    };

    const yInScale = data => {
        if(data.length <= 0)
            return d3
                .scaleOrdinal()
                .domain('none')
                .range([0]);
        var ret = d3
            .scaleOrdinal()
            .domain(data.map(d => d.name))
            .range(data.map((d, i) => (i + 1) * finalConfiguration.lineHeight));
        ret(0); // note : 최초 scale 접근 인덱스에 따라 정렬 순서가 뒤바뀌는 버그가 있음..
        return ret;
    };

    const xScale = (width, timeBounds) => {
        return d3.scaleTime().domain(timeBounds).range([0, width]);
    };

    function getScales(configuration, data) {
        return {
            x: xScale(dimensions.width, [
                configuration.start,
                configuration.end,
            ]),
            yOut: yOutScale(data.output),
            yIn: yInScale(data.input)
        };
    }

    function Initialize(selection) {
        return selection.each(function selector(data) {
            dimensions = {
                width: this.clientWidth - (finalConfiguration.labelsWidth + finalConfiguration.labelsRightMargin * 3),
                height: (data.input.length + 1) * finalConfiguration.lineHeight,
            };

            d3.select(this).select('.event-drops-chart').remove();
            const svg = d3
                .select(this)
                .append('svg')
                .classed('event-drops-chart', true)
                .attr('width', this.clientWidth)
                .attr('height', dimensions.height + finalConfiguration.margin.top + finalConfiguration.margin.bottom);

            scales = getScales(finalConfiguration, data);
            lastScales = { 'x': scales.x, 'yOut': scales.yOut, 'yIn': scales.yIn };
            drawHandler = drawer(svg, dimensions, scales, finalConfiguration);
            drawHandler.Initialize(data);
            zoom(svg, scales, lastScales, finalConfiguration, data);
        })
    }

    function Update(selection) {
        return selection.each(function selector(data) {
            dimensions.height = (data.input.length + 1) * finalConfiguration.lineHeight;
            d3.select(this).select('.event-drops-chart').attr('height', dimensions.height + finalConfiguration.margin.top + finalConfiguration.margin.bottom);
            lastScales.yOut = scales.yOut = yOutScale(data.output); lastScales.yIn = scales.yIn = yInScale(data.input);
            drawHandler.Update(lastScales, data);
            const svg = d3.select(this).select('.event-drops-chart');
            svg.selectAll('.chart-wrapper').call(d3.zoom().on('zoom', null).on('end', null));
            zoom(svg, scales, lastScales, finalConfiguration, data);
        })
    }

    configurable(Initialize, finalConfiguration);
    return { 'Initialize': Initialize, 'Update': Update };
}

export default eventDrops;
