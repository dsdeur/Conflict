import React, { PropTypes } from 'react'
import FTScroll from './FTScroll.jsx';
import {START_YEAR, END_YEAR} from '../utils/const.js';


class Scroller extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: true
        }
    }

    componentDidMount() {
        setTimeout(this.startAnimating.bind(this), 2000);
    }

    stopAnimating() {
        this.setState({animate: false});
    }

    startAnimating() {
        this._left = 0;
        this.animate();
    }

    animate() {
        if(!this.state.animate) return;

        requestAnimationFrame(this.animate.bind(this));
        this._left += 1;

        if(this._left % this.props.stepWidth == 0) {
            if(this.props.selectedYear+1 == END_YEAR) {
                this.stopAnimating();
            } else {
                this.props.changeSelectedYear(this.props.selectedYear +1);
            }
        }

        this.refs.scroller.getScroller().scrollTo(this._left, 0, 4000);
    }

    getSteps() {
        let {stepsCount, stepWidth} = this.props,
            stepsArray = [];

        for (let i = 0; i <= stepsCount; i++) {
            stepsArray.push(i*stepWidth);
        }

        return stepsArray;
    }

    onScrollEnd(e) {
        if(this._skipEnd || this.state.animate) {
            this._skipEnd = false;
            return;
        };

        this._skipEnd = true;

        let {stepsCount} = this.props,
            left = e.scrollLeft,
            stepsArray = this.getSteps();

        this.updateSelectedYear(left, stepsArray);

        // Prevent loop firing of onScrollEnd
        if(left == 0 || left == stepsArray[stepsCount-1]) return;

        let closestIndex = this.findClosestIndex(stepsArray, left);

        setTimeout(() => this.refs.scroller.getScroller().scrollTo(stepsArray[closestIndex], 0, true), 0);
    }

    onScroll(e) {
        // Only run this ones every 200 ms else skip it
        if(this._skip || this.state.animate) return;

        this._skip = setTimeout(() => {
            this._skip = false;
        }, 200);

        let {stepsCount} = this.props,
            left = e.scrollLeft,
            stepsArray = this.getSteps();

        this.updateSelectedYear(left, stepsArray);
    }

    updateSelectedYear(left, stepsArray) {
        let {changeSelectedYear} = this.props;

        let closestIndex = this.findClosestIndex(stepsArray, left),
            year = START_YEAR+closestIndex;

        changeSelectedYear(year);
    }

    findClosestIndex(items, value) {
        let startIndex  = 0,
            stopIndex   = items.length - 1,
            middle      = Math.floor((stopIndex + startIndex)/2);

        while(items[middle] != value && startIndex < stopIndex){
            if (value < items[middle]){
               stopIndex = middle - 1;
            } else if (value > items[middle]){
               startIndex = middle + 1;
            }

            middle = Math.floor((stopIndex + startIndex)/2);
        }

        let highOrLow = (items[middle] > value) ? -1 : 1;

        let diff = Math.abs(items[middle] - value),
            otherDiff = Math.abs(items[middle + highOrLow] - value);

        // console.log(items[middle], lowDiff, items[middle+1], highDiff);
        return (diff < otherDiff) ? middle : middle+highOrLow;
    }


    render () {
        return (
            <div
                onMouseDown={this.stopAnimating.bind(this)}
                onWheel={this.stopAnimating.bind(this)}
            >
                <FTScroll
                    ref="scroller"
                    scrollbars={false}
                    scrollingY={false}
                    bouncing={false}
                    maxFlingDuration={300}
                    updateOnWindowResize={true}
                    events={{
                        scrollend: this.onScrollEnd.bind(this),
                        scroll: this.onScroll.bind(this)
                    }}
                >
                    {this.props.children}
                </FTScroll>
            </div>
        )
    }
}

export default Scroller;
