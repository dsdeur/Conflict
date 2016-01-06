import './ConflictDetails.scss';
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

    shouldComponentUpdate(nextProps, nextState) {
        if(!this.props.conflict || !nextProps.conflict) {
            return true;
        };
        return nextProps.conflict.dyadId !== this.props.conflict.dyadId;
    }

    checkAvailable(value, content) {
        return (value) ? content : null;
    }

    render () {
        let {conflict, preparedData, totalsPerConflict, small, changeDetailConflict} = this.props;
        if(!conflict) {
            if(!small) {
                return <div className="ConflictDetails"></div>
            }
            return null;
        }

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
        let title = (
                <div className="Stats__Totals">
                    <h4><abbr title={conflict.sideA + ' - ' + conflict.sideB}>
                        {abbr(conflict.sideA, 30)} - {abbr(conflict.sideB, 30)}
                    </abbr></h4>

                    <h5>
                        Total deaths:
                        <span className="number float-right">{formatNumber(total.total)}</span>
                    </h5>
                </div>
            );
        let graph = <LineChart data={chartData} options={{responsive: true}} redraw />;

        if(small) {
            return (
                <StatsBox>
                    {title}

                    <div className="Stats__Graph Stats_Totals">
                        {graph}
                    </div>
                </StatsBox>
            );
        }

        return (
                <div className={`ConflictDetails ${conflict ? 'open' : ''}`}>
                    {title}

                    <div className="ConflictDetails__Content">
                        <div>{graph}</div>
                        <hr />
                        <table>
                            <tbody>
                                {this.checkAvailable(conflict.battleLocation, <tr>
                                    <td>Battle Location:</td>
                                    <td>{conflict.battleLocation || '-'}</td>
                                </tr>)}
                                {this.checkAvailable(conflict.sideA, <tr>
                                    <td>Side A:</td>
                                    <td>{conflict.sideA || '-'}</td>
                                </tr>)}
                                {this.checkAvailable(conflict.sideA2nd, <tr>
                                    <td>Side A 2nd:</td>
                                    <td>{conflict.sideA2nd || '-'}</td>
                                </tr>)}
                                {this.checkAvailable(conflict.sideB, <tr>
                                    <td>Side B:</td>
                                    <td>{conflict.sideB || '-'}</td>
                                </tr>)}
                                {this.checkAvailable(conflict.sideB2nd, <tr>
                                    <td>Side B 2nd:</td>
                                    <td>{conflict.sideB2nd || '-'}</td>
                                </tr>)}
                                {this.checkAvailable(conflict.territoryName, <tr>
                                    <td>Territory name:</td>
                                    <td>{conflict.territoryName || '-'}</td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>

                    <button className="ConflictDetails__Close" onClick={() => changeDetailConflict(null)}><i className="fa fa-times"></i></button>
                </div>
        );
    }
}

export default ConflictDetails;
