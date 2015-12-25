import React, { PropTypes } from 'react'
import FTScroll from './FTScroll.jsx';

class Scroller extends React.Component {
    onScrollEnd(e) {
        let {correction, stepsCount, stepWidth} = this.props,
            left = e.scrollLeft,
            stepsArray = [];

        for (let i = 0; i <= stepsCount; i++) {
            stepsArray.push(i*stepWidth);
        }

        // Prevent loop firing of onScrollEnd
        if(left == 0 || left == stepsArray[stepsCount-1]) return;

        console.log(stepsArray, left, e.scrollLeft);
        let closestIndex = this.findClosestIndex(stepsArray, left);
        console.log(closestIndex);

        this.refs.scroller.getScroller().scrollTo(stepsArray[closestIndex], false, 20000);
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

            let lowDiff = Math.abs(items[middle] - value),
                highDiff = Math.abs(items[middle+1] - value);

            console.log(items[middle], lowDiff, items[middle+1], highDiff);
            return (lowDiff < highDiff) ? middle : middle+1;
            var x
    }


    render () {
        return (
            <FTScroll
                ref="scroller"
                scrollbars={false}
                scrollingY={false}
                bouncing={false}
                events={{
                    scrollend: this.onScrollEnd.bind(this),
                }}
            >
                {this.props.children}
            </FTScroll>
        )
    }
}

export default Scroller;
