import React, { PropTypes } from 'react'

function getLineChartConfig(height, width) {
    let margin = {top: 20, right: 0, bottom: 30, left: 0},
        width  = window.innerWidth/3,
        height = window.innerWidth/3;

    let x = d3.scale.ordinal()
        .rangeBoundBands([0, width]);

    let y = d3.scale.linear()
        .rangeBound([height, 0]);

    let xAxis = d3.svg.axis()
        .scale(x)
        .orient('center');

    let yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    let line = d3.svg.line()
        .x((d) => x(d.date))
        .y((d) => y(d.close))
}

class LineChart extends React.Component  {
    componentDidMount() {
        this._svg = d3.select(this.refs.chart).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
    }

    renderChart(data) {
        y.domain(d3.extend(data, (d) => d.date));
        x.domain(d3.extend(data, (d) => d.close));

        this._svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis)

        this._svg.append('g')
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Number of deaths");

        this._svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
    }

    render () {
        return (
            <div ref="chart"></div>
        );
    }
}

export default LineChart;
