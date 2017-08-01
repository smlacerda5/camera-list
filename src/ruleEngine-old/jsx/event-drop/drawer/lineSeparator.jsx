export default (scales, configuration, dimensions) =>
    (container, data) => {
        container.select('.output-line-separator').remove();
        container
            .append('g')
            .classed('output-line-separator', true)
            .attr('transform', `translate(0, ${scales.yOut(0) + (configuration.lineHeight / 2)})`)
            .append('line')
            .attr('x1', 0)
            .attr('x2', dimensions.width);

        const inSeparators = container.selectAll('.input-line-separator').data(data.input);
        inSeparators
            .enter()
            .append('g')
            .classed('input-line-separator', true)
            .attr(
                'transform',
                (d, i) =>
                    `translate(0, ${scales.yIn(i) + (configuration.lineHeight / 2)})`
            )
            .append('line')
            .attr('x1', 0)
            .attr('x2', dimensions.width);

        inSeparators.exit().remove();
    };
