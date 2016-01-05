import React, { PropTypes } from 'react'
import {abbr} from '../utils/format.js';
import {Line as LineChart} from 'react-chartjs';

class ConflictDetails extends React.Component {
    getData(preparedData, dyadId) {
        let labels = [];
        let data = [];

        preparedData.forEach((x) => {
            if(x[dyadId] > 0) {
                labels.push(x.year);
                data.push(x[dyadId]);
            }
        });

        return {labels, data};
    }

    render () {
        let {conflict, preparedData} = this.props;
        if(!conflict) return null;

        let {labels, data} = this.getData(preparedData, conflict.dyadId);

        console.log(conflict, labels, data);

        let chartData = {
            labels: labels,
            datasets: [{
                label: 'Conflict',
                fillColor: 'rgba(255, 0,0,.2)',
                strokeColor: "#f32020",
                data: data
            }]
        }

        return (
            <div>
                <h4><abbr title={conflict.sideA + ' - ' + conflict.sideB}>
                    {abbr(conflict.sideA, 30)} - {abbr(conflict.sideB, 30)}
                </abbr></h4>

            <LineChart data={chartData} options={{responsive: true}} redraw />
            </div>
        )
    }
}

export default ConflictDetails;
