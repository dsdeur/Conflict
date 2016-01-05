import React from 'react';
import BloodStream from './BloodStream.jsx';
import Stats from './Stats.jsx';

import {getBRDData, prepareData, getTotalsPerYear, getTotalsPerConflict} from '../Data.js';
import {START_YEAR} from '../utils/const.js';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            preparedData: [],
            uniqIds: [],
            totalsPerYear: [],
            totalsPerConflict: [],
            totalsPYPC: {},
            selectedYear: START_YEAR,
            selectedConflict: null
        }
    }

    componentDidMount() {
        getBRDData((err, data) => {
            if(!err) {
                let {preparedData, uniqIds} = prepareData(data);
                let totalsPerYear = getTotalsPerYear(preparedData);
                let totalsPerConflict = getTotalsPerConflict(uniqIds, preparedData);
                this.setState({data, preparedData, uniqIds, totalsPerYear, totalsPerConflict});
            } else {
                console.log('Error loading data', err);
            }
        })
    }

    changeSelectedYear(year) {
        this.setState({selectedYear: year, selectedConflict: null});
    }

    render() {
        let {...state, totalsPerYear, selectedConflict, totalsPerConflict} = this.state;

        return (
            <div className="app">
                <BloodStream {...state} changeSelectedYear={this.changeSelectedYear.bind(this)}/>
                <Stats
                    {...state}
                    totalsPerYear={totalsPerYear}
                    selectedConflict={selectedConflict}
                    totalsPerConflict={totalsPerConflict}
                />
            </div>
        )
    }
}

export default App;
