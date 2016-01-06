import './MuteButton.scss';
import React, { PropTypes } from 'react'

class MuteButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: true
        }
    }

    onClick() {
        let el = document.getElementById('audio');

        if(this.state.playing) {
            el.pause();
        } else {
            el.play();
        }

        this.setState({playing: !this.state.playing});
    }

    render () {
        return (
            <span
                className={`MuteButton ${(this.props.intro) ? 'intro' : ''}`}
                onClick={this.onClick.bind(this)}>
                {(this.state.playing)
                    ? <i className="fa fa-volume-up"></i>
                    : <i className="fa fa-volume-off"></i>}
            </span>
        );    
    }
}

export default MuteButton;
