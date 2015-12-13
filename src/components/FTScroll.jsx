import React, { PropTypes } from 'react';
import {FTScroller} from 'ftscroller';


class FTScroll extends React.Component {
    componentDidMount() {
        this._scroller = new FTScroller(this.refs.container, this.props);
    }

    componentWillUnmount() {
        this._scroller.destroy();
    }

    render() {
        let {children} = this.props;

        return (
            <div ref="container">
                {children}
            </div>
        );
    }
}

export default FTScroll;
