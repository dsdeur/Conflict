import React from 'react';
import BloodStream from './BloodStream.jsx';

import {getBRDData, prepareData} from '../Data.js';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            preparedData: [],
            uniqIds: []
        }
    }

    componentDidMount() {
        getBRDData((err, data) => {
            if(!err) {
                let {preparedData, uniqIds} = prepareData(data);
                this.setState({data, preparedData, uniqIds});
            } else {
                console.log('Error loading data', err);
            }
        })
    }

    render() {
        let {...state} = this.state;

        return (
            <div className="app">
                <BloodStream {...state} />
            </div>
        )
    }
}

export default App;
