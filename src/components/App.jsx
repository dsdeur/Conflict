import React from 'react';
import BloodStream from './BloodStream.jsx';
import Stats from './Stats.jsx';

import {getBRDData, prepareData, getTotalsPerYear} from '../Data.js';
import {START_YEAR} from '../utils/const.js';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            preparedData: [],
            uniqIds: [],
            totalsPerYear: [],
            selectedYear: START_YEAR
        }
    }

    componentDidMount() {
        getBRDData((err, data) => {
            if(!err) {
                let {preparedData, uniqIds} = prepareData(data);
                let totalsPerYear = getTotalsPerYear(preparedData);
                this.setState({data, preparedData, uniqIds, totalsPerYear});
            } else {
                console.log('Error loading data', err);
            }
        })
    }

    changeSelectedYear(year) {
        this.setState({selectedYear: year});
    }

    render() {
        let {...state, totalsPerYear} = this.state;

        return (
            <div className="app">
                <BloodStream {...state} changeSelectedYear={this.changeSelectedYear.bind(this)}/>
                <Stats {...state} totalsPerYear={totalsPerYear}/>
            </div>
        )
    }
}

export default App;
