import React, { PropTypes } from 'react'
import Visualisation from './Visualisation.jsx';
import Intro from './Intro.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            intro: false
        }
    }

    hideIntro() {
        this.setState({intro: false});
    }

    render () {
        let {intro} = this.state;

        return (
            <div>
                <Visualisation />
                {intro ? <Intro hideIntro={this.hideIntro.bind(this)} /> : null}
            </div>
        )
    }
}

export default App;
