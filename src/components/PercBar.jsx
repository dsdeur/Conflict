import './PercBar.scss';
import React, { PropTypes } from 'react'

class PercBar extends React.Component {
    render () {
        let {perc, animated} = this.props,
            animatedClass = animated ? 'PercBar--animated' : '';

        return (
            <div className={`PercBar ${animatedClass}`}>
                <div className="PercBar__Filled" style={{width: perc + '%'}}></div>
                <div className="PercBar__Empty" style={{width: 100 - perc + '%'}}></div>
            </div>
        )
    }
}

export default PercBar;
