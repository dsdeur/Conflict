import React from 'react';
import _ from 'lodash';

class YoutubePlayer extends React.Component {
    componentDidMount() {
        let tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            this.onYouTubeIframeAPIReady();
        }
    }

    onYouTubeIframeAPIReady() {
        // Get the player domnode
        let playerNode = this.refs.player;

        // Create the player object and bind it to the component
        this.player = new YT.Player(playerNode, {
            height: 169,
            width: 300,
            videoId: this.props.video.sourceID,
            playerVars: {
                'controls': 1,
                'loop': 1
            },
            events: {
                'onReady': this.play.bind(this),
                'onStateChange': this.onPlayerStateChange.bind(this)
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        // Handle mute
        if(this.props.mute !== prevProps.mute) {
            if(this.props.mute) {
                this.player.mute();
            } else {
                this.player.unMute();
            }
        }
    }

    onPlayerStateChange(event) {
        let playerState = event.data;

        if(playerState == 0) {
            this.play();
        }

        if(this.props.changePlayerState) {
            this.props.changePlayerState(playerState);
        }
    }

    componentWillUnmount() {
        this.player.stopVideo();
    }

    getCurrentTime() {
        let currentTime = this.player.getCurrentTime();
        return currentTime;
    }

    play() {
        this.player.setLoop(true);
        this.player.setVolume(100);
        this.player.playVideo();
    }

    setTime(time) {
        this.player.seekTo(time, true);
    }

    pause() {
        this.player.pauseVideo();
    }

    render() {
        return (
            <div ref="player"></div>
        );
    }
}

export default YoutubePlayer;
