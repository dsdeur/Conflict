import './StatsBox.scss';
import React, { PropTypes } from 'react';

class StatsBox extends React.Component {
    render () {
        let className = (this.props.width) ? 'StatsBox--' + this.props.width : '';
        return (
            <div className={`StatsBox ${className}`}>
                {this.props.children}
            </div>
        );
    }
}

export default StatsBox;
