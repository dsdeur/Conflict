import './ConflictItem.scss';
import React, { PropTypes } from 'react'
import {formatNumber, abbr} from '../utils/format.js';
import MotionNumber from './MotionNumber.jsx';
import PercBar from './PercBar.jsx';

class ConflictItem extends React.Component {
    render () {
        let {conflict, property, animated, total} = this.props,
            percentage = conflict[property] * 100 / total;

        return (
            <small className="ConflictItem">
                <abbr title={conflict.sideA + ' - ' + conflict.sideB}>
                    {abbr(conflict.sideA, 30)} - {abbr(conflict.sideB, 30)}
                </abbr>:

                <span className="ConflictItem__Number">
                    <span className="float-right">{formatNumber(conflict[property])}</span>
                </span>

                <PercBar perc={percentage} animated={animated} />
            </small>
        );
    }
}

export default ConflictItem;
