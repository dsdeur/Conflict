import React from 'react';
import BloodStream from './BloodStream.jsx';
import Stats from './Stats.jsx';
import ConflictDetails from './ConflictDetails.jsx';

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
            selectedConflict: null,
            detailConflict: null
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

    changeSelectedConflict(conflict) {
        this.setState({selectedConflict: conflict})
    }

    changeDetailConflict(conflict) {
        this.setState({detailConflict: conflict});
    }

    render() {
        let {
            totalsPerYear,
            selectedConflict,
            totalsPerConflict,
            detailConflict,
            preparedData,
            ...state,
        } = this.state;

        return (
            <div className="app">
                <BloodStream
                    {...state}
                    preparedData={preparedData}
                    changeSelectedYear={this.changeSelectedYear.bind(this)}
                    changeSelectedConflict={this.changeSelectedConflict.bind(this)}
                    changeDetailConflict={this.changeDetailConflict.bind(this)}
                />
                <Stats
                    ref="stats"
                    {...state}
                    preparedData={preparedData}
                    totalsPerYear={totalsPerYear}
                    selectedConflict={selectedConflict}
                    totalsPerConflict={totalsPerConflict}
                    changeSelectedConflict={this.changeSelectedConflict.bind(this)}
                    changeDetailConflict={this.changeDetailConflict.bind(this)}
                />

                <ConflictDetails
                    conflict={detailConflict}
                    totalsPerConflict={totalsPerConflict}
                    preparedData={preparedData}
                    changeDetailConflict={this.changeDetailConflict.bind(this)}
                />
            </div>
        )
    }
}

export default App;
