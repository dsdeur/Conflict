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
        this._timer = setTimeout(this.nextSlide.bind(this), 3000);
    }

    hideAll() {
        this._timer = setTimeout(this.nextSlide.bind(this), 4000);
        this.setState({hide: true});
    }

    nextSlide() {
        if(this.state.currentTitle+1 < titles.length) {
            this.setState({currentTitle: this.state.currentTitle+1, hide: false});
            this._timer = setTimeout(this.hideAll.bind(this), 6000);
        } else {
            this.hideIntro();
        }
    }

    hideIntro() {
        clearTimeout(this._timer);
        setTimeout(() => this.setState({fadeOut: 'fadeOut'}), 1000);
        setTimeout(this.props.hideIntro, 2000);
        this.setState({hide: true});
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
                <button onClick={this.hideIntro.bind(this)} className="Intro__Skip">
                    Skip intro <i className="fa fa-angle-double-right"></i>
                </button>
            </div>
        )
    }
}

export default Intro;
