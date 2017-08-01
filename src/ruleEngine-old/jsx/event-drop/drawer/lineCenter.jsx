export const centerLine = (scales, dimensions) =>
    (container, data) => {
        var domain = scales.x.domain();
        var scaledHalf = scales.x(domain[0].getTime() + ((domain[1] - domain[0]) / 2));

        container.select('line-center').remove();
        container
            .append('g')
            .classed('line-center', true)
            .append('line')
            .attr('x1', scaledHalf)
            .attr('x2', scaledHalf)
            .attr('y1', 0)
            .attr('y2', dimensions.height);
    };

export const centerInfo = (scales) =>
    (container, data) => {
        var domain = scales.x.domain();
        var start = domain[0].getTime();
        var end = domain[1].getTime();
        var centerTimestamp = start + ((end - start) / 2);
        var centerDate = new Date(centerTimestamp);
        var scaledHalf = scales.x(centerTimestamp);

        container.select('.line-center-text').remove();
        container
            .append('text')
            .classed('line-center-text', true)
            .attr('x', scaledHalf)
            .attr('transform', `translate(0, ${15 + 60 + (data.input.length > 0 ? scales.yIn(data.input.length - 1) : 0)})`)
            .attr('font-size', 11)
            .text(centerDate);
    };
