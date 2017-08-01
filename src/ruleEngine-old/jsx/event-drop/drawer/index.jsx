import { metaballs } from '../metaballs';
import dropsFactory from './drops';
import labelsFactory from './labels';
import markerFactory from './marker';
import { centerLine, centerInfo } from './lineCenter';
import lineSeparatorFactory from './lineSeparator';
import { drawTopAxis, drawBottomAxis, boolOrReturnValue } from './xAxis';

export default (svg, dimensions, scales, configuration) => {
    const defs = svg.append('defs');

    defs
        .append('clipPath')
        .attr('id', 'drops-container-clipper')
        .append('rect')
        .attr('id', 'drops-container-rect')
        .attr('width', dimensions.width)
        .attr(
            'height',
            dimensions.height +
                configuration.margin.top +
                configuration.margin.bottom
        );

    const labelsContainer = svg
        .append('g')
        .classed('labels', true)
        .attr('transform', `translate(0, ${configuration.lineHeight})`);

    const chartContainer = svg
        .append('g')
        .attr('class', 'chart-wrapper')
        .attr('transform', `translate(${configuration.labelsWidth + configuration.labelsRightMargin}, 25)`);

    const actionPanel = chartContainer
        .append('rect')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)
        .attr('fill', '#DDDDDD');

    const hAxesContainer = chartContainer.append('g').classed('hAxes', true);
    const hLineSeparator = lineSeparatorFactory(scales, configuration, dimensions);

    const dropsContainer = chartContainer
        .append('g')
        .classed('drops-container', true)
        .attr('clip-path', 'url(#drops-container-clipper)')
        .style('filter', 'url(#metaballs)');

    const vAxesContainer = chartContainer.append('g').classed('vAxes', true);
    const vLineSeparator = centerLine(scales, dimensions);
    const vLineInfo = centerInfo(scales);
    const labels = labelsFactory(labelsContainer, scales, configuration);

    var initializer = data => {
        hLineSeparator(hAxesContainer, data);
        vLineSeparator(vAxesContainer, data);
        vLineInfo(svg, data);
        dropsFactory(dropsContainer, scales, configuration, data);
        markerFactory(dropsContainer, scales, configuration, data);
        labels(data);
        drawTopAxis(hAxesContainer, scales.x, configuration, dimensions);
    }

    var updater = (scales, data) => {
        actionPanel.attr('height', dimensions.height);
        hLineSeparator(hAxesContainer, data);
        vLineSeparator(vAxesContainer, data);
        vLineInfo(svg, data);
        dropsFactory(dropsContainer, scales, configuration, data);
        markerFactory(dropsContainer, scales, configuration, data);
    };

    return {
        'Initialize': initializer,
        'Update': updater
    };
};
