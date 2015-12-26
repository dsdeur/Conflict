import './BloodStream.scss';

import React from 'react';
import d3 from 'd3';
import _ from 'lodash';
import {getRandomReds} from '../utils/color.js';
import Scroller from './Scroller.jsx';
import {YEAR_WIDTH, YEARS_COUNT} from '../utils/const.js';


let margin = {top: 20, right: 0, bottom: 30, left: 0},
    width  = YEAR_WIDTH * 26,
    height = window.innerHeight*6/10;

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
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: window.innerWidth
        }
    }

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

        window.addEventListener('resize', () => this.updateWindowWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateWindowWidth);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (JSON.stringify(this.props) != JSON.stringify(nextProps));
    }

    updateWindowWidth() {
        this.setState({
            windowWidth: window.innerWidth
        });
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
            .attr("class", "xaxis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        let selection = svg.selectAll(".series")
            .data(seriesArr)
            .enter().append("g")
            .attr("class", "series");

        svg.selectAll(".series")
            .attr("opacity", 1)
            .on("mouseover", (d, i) => {
                // console.log(d, i);
                let values = _.sum(_.pluck(d.values, 'value'));
                let dyadId = d.name;
                let conflictData = data.filter((c) => {
                    return c.dyadId == dyadId;
                });

                // console.log(values, conflictData);

                svg.selectAll(".series").transition()
                    .duration(250)
                    .attr("opacity", (d, j) => {
                        return j != i ? 0.6 : 1;
                    })
            })
            .on("mouseout", (d, i) => {
                svg.selectAll(".series")
                    .transition()
                    .duration(250)
                    .attr("opacity", "1");
              })

        selection.append("path")
            .attr("class", "streamPath")
            .attr("d", d => area(d.values))
            .style("fill", d => color(d.name))
    }

    render() {
        let {windowWidth} = this.state,
            {changeSelectedYear} = this.props,
            correction = windowWidth/2 - YEAR_WIDTH/2,
            styles = {
                marginLeft: correction,
                marginRight: correction
            };

        return (
            <div className="BloodStream">
                <div className="BloodStream__YearIndicator"></div>
                <Scroller
                    correction={correction}
                    stepsCount={YEARS_COUNT}
                    stepWidth={YEAR_WIDTH}
                    changeSelectedYear={changeSelectedYear}
                >
                    <div ref='chart' style={styles}></div>
                </Scroller>
            </div>
        )
    }
}

export default BloodStream;
