import React, { PropTypes } from 'react'
import Visualisation from './Visualisation.jsx';
import Intro from './Intro.jsx';
import MuteButton from './MuteButton.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            intro: true
        }
    }

    hideIntro() {
        this.setState({intro: false});
    }

    render () {
        let {intro} = this.state;

        return (
            <div>
                {intro ? <Intro hideIntro={this.hideIntro.bind(this)} /> : <Visualisation />}
                <MuteButton intro={intro}/>
            </div>
        )
    }
}

export default App;
