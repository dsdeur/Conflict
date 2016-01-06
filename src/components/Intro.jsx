import './Intro.scss';
import React, { PropTypes } from 'react'

const titles = [
    "Every year thousands of people die in wars",

    "Is this really necessary?",

    <span>Why can’t we stop this <span className='red'>blood</span> shedding?</span>
];

class Intro extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTitle: -1,
            hide: true,
            fadeOut: ''
        }
    }

    componentDidMount() {
        setTimeout(this.nextSlide.bind(this), 3000);
    }

    hideAll() {
        setTimeout(this.nextSlide.bind(this), 4000);
        this.setState({hide: true});
    }

    nextSlide() {
        if(this.state.currentTitle+1 < titles.length) {
            this.setState({currentTitle: this.state.currentTitle+1, hide: false});
            setTimeout(this.hideAll.bind(this), 6000);
        } else {
            setTimeout(() => this.setState({fadeOut: 'fadeOut'}), 1000);
            setTimeout(this.props.hideIntro, 2000);
            this.setState({hide: true});
        }
    }

    render () {
        let {currentTitle, hide} = this.state,
            titlesComps = titles.map((title, i) => {
                return (
                    <h1
                        key={i}
                        className={(!hide && i == currentTitle) ? 'visible' : ''}>
                        {title}
                    </h1>
                );
            });

        return (
            <div className={`Intro ${this.state.fadeOut}`}>
                <div className="Intro__Titles">
                    {titlesComps}
                </div>
            </div>
        )
    }
}

export default Intro;
