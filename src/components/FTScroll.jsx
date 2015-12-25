import React, { PropTypes } from 'react';
import {FTScroller} from 'ftscroller';


class FTScroll extends React.Component {
    componentDidMount() {
        this._scroller = new FTScroller(this.refs.container, this.props);
        this.addEventListeners(this.props.events);
    }

    componentWillUnmount() {
        this.removeEventListeners(this.props.events);
    }

    addEventListeners(events) {
        for (let key in events) {
            if (events.hasOwnProperty(key)) {
                console.log(key, events[key])
                this._scroller.addEventListener(key, events[key]);
            }
        }
    }

    removeEventListeners(events) {
        for (let key in events) {
            if (events.hasOwnProperty(key)) {
                this._scroller.removeEventListener(key, events[key]);
            }
        }
    }

    componentWillUnmount() {
        this._scroller.destroy();
    }

    getScroller() {
        return this._scroller;
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
