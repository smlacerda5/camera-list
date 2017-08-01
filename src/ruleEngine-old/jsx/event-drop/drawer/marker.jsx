var leftPath = 'M 10 -6 L 0 0 L 10 6';

export default (container, scales, configuration, data) => {
    var circleMarkerData = [];
    var arrowMarkerData = [];

    var halfLineHeight = configuration.lineHeight / 2;
    if(data.output.point != null) {
        var cx = scales.x(data.output.point);
        if(cx < -7) {
            arrowMarkerData.push({
                'time': data.output.point,
                'path': leftPath,
                'x': 0,
                'y': scales.yOut(0) + halfLineHeight
            });
        }
        else {
            circleMarkerData.push({
                'time': data.output.point,
                'r': 7,
                'cx': cx,
                'cy': scales.yOut(0) + halfLineHeight
            });
        }
    }

    for(var index in data.input) {
        var point = data.input[index].point;
        if(point != null) {
            var cx = scales.x(point);
            if(cx < -7) {
                arrowMarkerData.push({
                    'time': data.output.point,
                    'path': leftPath,
                    'x': 0,
                    'y': scales.yIn(index) + halfLineHeight
                });
            }
            else {
                circleMarkerData.push({
                    'time': point,
                    'r': 5,
                    'cx': cx,
                    'cy': scales.yIn(index) + halfLineHeight
                });
            }
        }
    }

    container.selectAll('.marker-layer').remove();
    const markerLayer = container
        .append('g')
        .classed('marker-layer', true);

    markerLayer
        .selectAll('.circle-marker')
        .data(circleMarkerData)
        .enter()
        .append('circle')
        .classed('circle-marker', true)
        .attr('r', d => d.r)
        .attr('cx', d => d.cx)
        .attr('cy', d => d.cy)
        .attr('fill', '#8C564B')
        .attr('fill-opacity', '0.4')
        .attr('stroke', ' #7C464B')
        .attr('stroke-width', '2px')
        .exit()
        .remove();

    markerLayer
        .selectAll('.path-marker')
        .data(arrowMarkerData)
        .enter()
        .append('path')
        .classed('path-marker', true)
        .attr('d', d => d.path)
        .attr('fill', '#7C464B')
        .attr('stroke', ' #7C464B')
        .attr('stroke-width', '1px')
        .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
        .exit()
        .remove();
};
