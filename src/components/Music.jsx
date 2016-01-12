import './Music.scss';
import React, { PropTypes } from 'react';
import YoutubePlayer from './YoutubePlayer.jsx';

class Music extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mute: false
        }
    }

    onClick() {
        this.setState({mute: !this.state.mute});
    }

    render () {
        return (
            <div className={`Music ${(this.props.intro) ? 'Music--intro' : ''}`}>
                <small>
                    <a href="https://www.youtube.com/watch?v=MtmrYisoxXA" target="_blank">
                        <i className="fa fa-youtube-play"></i>&nbsp;
                        Alt-J - Nara&nbsp;
                    </a>
                    <button onClick={this.onClick.bind(this)} className="Music__Mute">
                        {(!this.state.mute)
                            ? <i className="fa fa-volume-up"></i>
                            : <i className="fa fa-volume-off"></i>}
                    </button>
                </small><br />
                <div className="Music__Player">
                    <YoutubePlayer mute={this.state.mute} video={{sourceID: 'MtmrYisoxXA'}} />
                </div>
            </div>
        );
    }
}

export default Music;
