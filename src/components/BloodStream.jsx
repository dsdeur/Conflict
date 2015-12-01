require('./BloodStream.scss');

import React from 'react';
import d3 from 'd3';
import _ from 'lodash';
import {getRandomReds} from '../utils/color.js';
import DragScroll from './DragScroll.jsx';

let margin = {top: 20, right: 55, bottom: 30, left: 100},
    width  = window.innerWidth*10,
    height = window.innerHeight*2/3;

let x = d3.scale.ordinal()
    .rangeRoundBands([0, width])

let y = d3.scale.linear()
    .rangeRound([height, 0]);

let xAxis = d3.svg.axis()
    .scale(x)
    .orient('center');

let yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

let stack = d3.layout.stack()
    .offset('silhouette')
    .order('inside-out')
    .values(d => d.values)
    .x(d => x(d.label) + x.rangeBand() / 2)
    .y(d => d.value);

let area = d3.svg.area()
    .interpolate('cardinal')
    .x(d => x(d.label) + x.rangeBand() / 2)
    .y0(d => y(d.y0))
    .y1(d => y(d.y0 + d.y));

let color = d3.scale.ordinal()
    .range(getRandomReds(324)); // It's magic

let svg;

class BloodStream extends React.Component {
    componentDidMount() {
        svg = d3.select(this.refs.chart).append('svg')
            .attr("width",  width  + margin.left + margin.right)
            .attr("height", height + margin.top  + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        let {data, preparedData, uniqIds} = this.props;
        this.renderStream(data, preparedData, uniqIds);
    }

    componentDidUpdate() {
        let {data, preparedData, uniqIds} = this.props;
        this.renderStream(data, preparedData, uniqIds);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (JSON.stringify(this.props) != JSON.stringify(nextProps));
    }

    renderStream(data, preparedData, uniqIds) {
        color.domain(uniqIds);

        let seriesArr = [],
            series = {};

        uniqIds.forEach(name => {
            series[name] = {name: name, values: []};
            seriesArr.push(series[name]);
        });

        preparedData.forEach(d => {
            uniqIds.forEach(name => {
                series[name].values.push({name: name, label: d['year'], value: +d[name]});
            });
        });

        x.domain(preparedData.map(d => d.year));

        stack(seriesArr);

        y.domain([0, d3.max(seriesArr, c => {
            return d3.max(c.values, d => d.y0 + d.y);
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Number of Battle related deaths");

        let selection = svg.selectAll(".series")
            .data(seriesArr)
            .enter().append("g")
            .attr("class", "series");

        selection.append("path")
            .attr("class", "streamPath")
            .attr("d", d => area(d.values))
            .style("fill", d => color(d.name))
    }

    render() {
        return (
            <div className="BloodStream">
                <DragScroll max={window.innerWidth*10} ref="dragscroll">
                    <div ref='chart'></div>
                </DragScroll>
            </div>
        )
    }
}

export default BloodStream;
