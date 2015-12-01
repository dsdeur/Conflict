var React = require('React');

var clearInterval = require('clearInterval');
var requestAnimationFrame = require('requestAnimationFrame');
var setInterval = require('setInterval');

import React from 'react';


class DragScroll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            min: 0,
            max: props.max || 0,
            pressed: false,
            velocity: null,
            frame: null,
            timestamp: null,
            x: 0,
            reference: null,
            amplitude: null,
            target: null
        }
    }

    componentDidMount() {
        if(this.props) return;
        this.update();
    }

    update() {
        this.setState({
            max: this.refs.container.offsetWidth - this.refs.view.offsetWidth,
        });
    }

    xpos(e) {
        if(e.targetTouches && (e.targetTouches.length >= 1)) {
            return e.targetTouches[0].clientX;
        }

        return e.clientX;
    }

    getTransformStyles() {
        let {max, min, offset} = this.state;

        let val = `translateX(${-offset}px)`

        return {
            WebkitTransform: val,
            msTransfrom: val,
            transform: val
        }
    }

    tap(e) {
        e.preventDefault();
        e.stopPropagation();

        clearInterval(this.ticker);
        this.ticker = setInterval(() => this.track(), 100);

        this.setState({
            pressed: true,
            reference: this.xpos(e),
            velocity: 0,
            amplitude: 0,
            timestamp: Date.now(),
        });
    }

    track() {
        let {timestamp, offset, frame, velocity} = this.state,
            now = Date.now(),
            elapsed = now - timestamp,
            delta = offset - frame,
            v = 1000 * delta / (1 + elapsed);

            this.setState({
                timestamp: now,
                frame: offset,
                velocity: 0.8 * v + 0.2 * velocity
            });
    }

    drag(e) {
        if(!this.state.pressed) return;

        e.preventDefault();
        e.stopPropagation();

        let {reference, min, max, offset} = this.state;
        let x, delta;

        x = this.xpos(e);
        delta = reference - x;
        let newOffset = offset + delta;

        if(delta > 2 || delta < -2) {
            this.setState({
                reference: x,
                offset: (newOffset > max) ? max : (newOffset < min) ? min : newOffset
            });
        }
    }

    release(e) {
        e.preventDefault();
        e.stopPropagation();

        let {velocity, offset, amplitude} = this.state;

        clearInterval(this.ticker);
        if(velocity > 10 || velocity < -10) {
            console.log("GOOOO");
            let newAmplitude = 0.8 * velocity;

            this.setState({
                amplitude: newAmplitude,
                target: Math.round(offset + newAmplitude),
                timestamp: Date.now(),
                pressed: false
            });

            requestAnimationFrame(() => this.autoScroll());
        } else {
            this.setState({pressed: false})
        }
    }

    autoScroll() {
        console.log('autoScroll');
        let {timestamp, amplitude, target} = this.state;
        if(!amplitude) return;

        let elapsed = Date.now() - timestamp,
            delta = -amplitude * Math.exp(-elapsed / this.props.timeConstant);

        if(delta > 0.5 || delta < -0.5) {
            console.log("HELLLO");
            requestAnimationFrame(() => this.autoScroll());
            this.setState({offset: target + delta});
        } else {
            this.setState({offset: target});
        }
    }

    render() {
        let {className, children} = this.props;

        return (
            <div
                ref="container"
                style={styles}
                className={`DragScroll ${className}`}
            >
                <div
                    ref="view"
                    style={this.getTransformStyles()}
                    className="DragScroll__view"
                    onMouseDown={this.tap.bind(this)}
                    onMouseMove={this.drag.bind(this)}
                    onMouseUp={this.release.bind(this)}
                    onTouchStart={this.tap.bind(this)}
                    onTouchMove={this.drag.bind(this)}
                    onTouchEnd={this.release.bind(this)}
                >
                    {children}
                </div>
            </div>
        );
    }
}

DragScroll.defaultProps = { timeContant: 325 };

var styles = {
    width: '100%',
    overflow: 'hidden'
}

export default DragScroll;
