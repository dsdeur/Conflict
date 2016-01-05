import React, { PropTypes } from 'react'
import {abbr} from '../utils/format.js';
import {Line as LineChart} from 'react-chartjs';
import StatsBox from './StatsBox.jsx';
import {formatNumber} from '../utils/format.js';

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
        let {conflict, preparedData, totalsPerConflict} = this.props;
        if(!conflict) return null;

        let {labels, data} = this.getData(preparedData, conflict.dyadId);

        let chartData = {
            labels: labels,
            datasets: [{
                label: 'Conflict',
                fillColor: 'rgba(255, 0,0,.2)',
                strokeColor: "#f32020",
                data: data
            }]
        }

        let total = totalsPerConflict.filter((t) => t.dyadId == conflict.dyadId)[0];
        
        return (
            <StatsBox>
                <div className="Stats__Totals">
                    <h4><abbr title={conflict.sideA + ' - ' + conflict.sideB}>
                        {abbr(conflict.sideA, 30)} - {abbr(conflict.sideB, 30)}
                    </abbr></h4>

                    <h5>
                        Total deaths:
                        <span className="number float-right">{formatNumber(total.total)}</span>
                    </h5>
                </div>

                <div className="Stats__Graph Stats_Totals">
                    <LineChart data={chartData} options={{responsive: true}} redraw />
                </div>
            </StatsBox>
        )
    }
}

export default ConflictDetails;
