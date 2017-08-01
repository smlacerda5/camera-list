import * as d3 from 'd3/build/d3';

export default (container, scales, configuration, data) => {
    container.selectAll('.output-drop-merged-line').remove();
    container.selectAll('.input-drop-merged-line').remove();
    container.selectAll('.output-drop-line').remove();
    container.selectAll('.input-drop-line').remove();

    if(data.merged) {
        const outputDropLine = container
            .selectAll('.output-drop-merged-line')
            .data([data.output])
            .enter()
            .append('g')
            .classed('output-drop-merged-line', true)
            .attr('transform', `translate(0, ${scales.yOut(0)})`);

        outputDropLine
            .append('rect')
            .classed('drop', true)
            .attr('rx', 7)
            .attr('ry', 7)
            .attr('x', d => scales.x(configuration.date(d.data[0])) - 7)
            .attr('y', (configuration.lineHeight / 2) - 7)
            .attr('width', d => scales.x(configuration.date(d.data[1])) - scales.x(configuration.date(d.data[0])) + 14)
            .attr('height', 14)
            .attr('fill', '#555555');

        const inputDropLines = container
            .selectAll('.input-drop-merged-line')
            .data(data.input)
            .enter()
            .append('g')
            .classed('input-drop-merged-line', true)
            .attr('transform', (d, idx) => `translate(0, ${scales.yIn(idx)})`);

        inputDropLines
            .append('rect')
            .classed('drop', true)
            .attr('rx', 5)
            .attr('ry', 5)
            .attr('x', d => scales.x(configuration.date(d.data[0])) - 5)
            .attr('y', (configuration.lineHeight / 2) - 5)
            .attr('width', d => scales.x(configuration.date(d.data[1])) - scales.x(configuration.date(d.data[0])) + 10)
            .attr('height', 10)
            .attr('fill', '#777777');
    }
    else {
        const outputDropLine = container
            .append('g')
            .classed('output-drop-line', true)
            .attr('transform', `translate(0, ${scales.yOut(0)})`);

        if(data.output.data != null) {
            outputDropLine
                .selectAll('.drop')
                .data(data.output.data)
                .enter()
                .append('circle')
                .classed('drop', true)
                .attr('r', 7)
                .attr('cx', d => scales.x(configuration.date(d)))
                .attr('cy', configuration.lineHeight / 2)
                .attr('fill', d => d.success ? '#555555' : '#EEEEEE')
                .attr('stroke', ' #555555')
                .attr('stroke-width', '2px')
                .on('click', configuration.click)
                .on('mouseover', configuration.mouseover)
                .on('mouseout', configuration.mouseout);
        }

        const inputDropLines = container
            .selectAll('.input-drop-line')
            .data(data.input)
            .enter()
            .append('g')
            .classed('input-drop-line', true)
            .attr('transform', (d, idx) => `translate(0, ${scales.yIn(idx)})`);

        inputDropLines
            .selectAll('.drop')
            .data(d => d.data)
            .enter()
            .append('circle')
            .classed('drop', true)
            .attr('r', 5)
            .attr('cx', d => scales.x(configuration.date(d)))
            .attr('cy', configuration.lineHeight / 2)
            .attr('fill', '#777777')
            .on('click', configuration.click)
            .on('mouseover', configuration.mouseover)
            .on('mouseout', configuration.mouseout);
    }
};
