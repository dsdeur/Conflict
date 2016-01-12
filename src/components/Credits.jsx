import './Credits.scss';
import React, { PropTypes } from 'react';

class Credits extends React.Component {
    render () {
        let {width, height} = this.props,
            styles = {
                height: height + 'px',
                width: width + 'px'
            };

        return (
            <div className="Credits" style={styles}>
                <div className="Credits__Content">
                    <h5>Created by</h5>
                    <small>Durgé Seerden</small>
                    <small className="Credits__Links">
                        <a href="http://dsdeur.me"><i className="fa fa-globe"/></a>
                        <a href="http://twitter.com/dsdeur"><i className="fa fa-twitter"/></a>
                        <a href="http://linkedin.com/dsdeur"><i className="fa fa-linkedin"/></a>
                        <a href="https://nl.linkedin.com/in/dseerden"><i className="fa fa-github"/></a>
                    </small>

                    <h5>Dataset</h5>
                    <small>UCDP Battle-Related Deaths Dataset <a href="http://www.pcr.uu.se/research/ucdp/datasets/ucdp_battle-related_deaths_dataset/"><i className="fa fa-external-link"></i></a></small>

                    <h5>Music</h5>
                    <small>Alt-J - Nara</small>
                    <small className="Credits__Links">
                        <a href="https://itunes.apple.com/nl/album/this-is-all-yours/id886683838?app=itunes&ign-mpt=uo%3D4"><i className="fa fa-music"></i></a>
                        <a href="https://www.youtube.com/watch?v=MtmrYisoxXA"><i className="fa fa-youtube"></i></a>
                        <a href="https://play.spotify.com/album/6TbkWAqqY4nhQnYim61IU8"><i className="fa fa-spotify"></i></a>
                    </small>
                </div>
            </div>
        )
    }
}

export default Credits;
