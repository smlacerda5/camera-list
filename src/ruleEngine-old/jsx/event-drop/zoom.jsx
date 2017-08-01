import * as d3 from 'd3/build/d3';
import xAxis from './xAxis';
import { boolOrReturnValue } from  './drawer/xAxis'
import { centerInfo } from './drawer/lineCenter';
import markerFactory from './drawer/marker';

export default (container, scales, lastScales, configuration, data) => {
    const onZoom = (data, index, element) => {
        lastScales.x = d3.event.transform.rescaleX(scales.x);
        container.selectAll('.x-axis.top').call(d3.axisTop().scale(lastScales.x));
        var drawer = centerInfo(lastScales);

        requestAnimationFrame(() =>{
            container.selectAll('.output-drop-line')
                .selectAll('.drop')
                .attr('cx', d => lastScales.x(d.time));

            container.selectAll('.input-drop-line')
                .selectAll('.drop')
                .attr('cx', d => lastScales.x(d.time));

            container.selectAll('.output-drop-merged-line')
                .selectAll('.drop')
                .attr('x', d => lastScales.x(configuration.date(d.data[0])) - 7)
                .attr('width', d => lastScales.x(configuration.date(d.data[1])) - lastScales.x(configuration.date(d.data[0])) + 14)

            container.selectAll('.input-drop-merged-line')
                .selectAll('.drop')
                .attr('x', d => lastScales.x(configuration.date(d.data[0])) - 5)
                .attr('width', d => lastScales.x(configuration.date(d.data[1])) - lastScales.x(configuration.date(d.data[0])) + 10)

            markerFactory(container.select('.drops-container'), lastScales, configuration, data);

            drawer(container, data);
            configuration.rangeUpdated(lastScales.x.domain());
        });
    };

    const onZoomEnd = (data, index, element) => {
        var domain = d3.event.transform.rescaleX(scales.x).domain();
        var start = domain[0].getTime();
        var end = domain[1].getTime();
        configuration.zoomend(Math.round((start + end) / 2));
    };

    const zoom = d3.zoom()
        .scaleExtent([configuration.minScale, configuration.maxScale])
        .on('zoom', onZoom)
        .on('end', onZoomEnd);
    container.select('.chart-wrapper').call(zoom);
    return zoom;
};
