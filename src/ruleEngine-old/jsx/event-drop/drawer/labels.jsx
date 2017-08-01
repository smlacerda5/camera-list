export default (container, scales, config) =>
    data => {

        container.select('.output-label').remove();
        container
            .append('text')
            .classed('output-label', true)
            .attr('x', config.labelsWidth)
            .attr('transform', `translate(0, ${15 + scales.yOut(0)})`)
            .attr('text-anchor', 'end')
            .text(data.output.name);

        const labels = container.selectAll('.input-label').data(data.input);
        const text = d => { return d.name; };
        labels.text(text);

        labels
            .enter()
            .append('text')
            .classed('input-label', true)
            .attr('x', config.labelsWidth)
            .attr('transform', (d, idx) => `translate(0, ${15 + scales.yIn(idx)})`)
            .attr('text-anchor', 'end')
            .text(text);

        labels.exit().remove();
    };
