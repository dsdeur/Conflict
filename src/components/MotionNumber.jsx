import React, { PropTypes } from 'react';
import {Motion, spring} from 'react-motion';
import {formatNumber} from '../utils/format.js'

class MotionNumber extends React.Component {
    render () {
        let {number} = this.props;

        return (
            <Motion defaultStyle={{x: 0}} style={{x: spring(number)}}>
                {value => <span className="float-right number">{formatNumber(Math.round(value.x))}</span>}
            </Motion>
        );
    }
}

export default MotionNumber;
