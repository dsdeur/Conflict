import './ConflictItem.scss';
import React, { PropTypes } from 'react'
import {formatNumber, abbr} from '../utils/format.js';
import MotionNumber from './MotionNumber.jsx';

class ConflictItem extends React.Component {
    render () {
        let {conflict, property, motionNumbers} = this.props;

        return (
            <small className="ConflictItem">
                {abbr(conflict.sideA)} - {abbr(conflict.sideB)}:
                {!motionNumbers ?
                    <span className="float-right">{formatNumber(conflict[property])}</span> :
                    <MotionNumber number={conflict[property]} />}
            </small>
        )
    }
}

export default ConflictItem;
