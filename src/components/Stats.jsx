import './Stats.scss'
import React, { PropTypes } from 'react';
import _ from 'lodash';
import StatsBox from './StatsBox.jsx';
import {START_YEAR} from '../utils/const.js';
import {formatNumber, abbr} from '../utils/format.js';
import ConflictItem from './ConflictItem.jsx';
import MotionNumber from './MotionNumber.jsx';


class Stats extends React.Component {
    getTotalDeaths(year, data) {
        return _.sum(data.filter((x) => {
            return x.year <= year;
        }), (x) => {
            return x.total;
        });
    }

    getAllSortedConflicts(data, year) {
        let conflicts = {};

        data.forEach((entry) => {
            if(entry.year <= year) {
                if(!conflicts[entry.dyadId]) {
                    conflicts[entry.dyadId] = entry;
                    conflicts[entry.dyadId].total = 0;
                }

                conflicts[entry.dyadId].total += entry.bdBest;
            }
        });

        return _.sortByOrder(_.values(conflicts), 'total', 'desc');
    }

    getSortedConflicts(year, data) {
        return _.sortByOrder(data.filter((conflict) => {
            return conflict.year == year;
        }), 'bdBest', 'desc');
    }

    render () {
        let {data, selectedYear, preparedData, totalsPerYear} = this.props,
            total = this.getTotalDeaths(selectedYear, totalsPerYear),
            allSortedConflicts = this.getAllSortedConflicts(data, selectedYear),
            sortedConflicts = this.getSortedConflicts(selectedYear, data),
            totalSelectedYear = _.find(totalsPerYear, {year: selectedYear});

        return (
            <div className="Stats">
                <StatsBox>
                    <div className="Stats__Totals">
                        <h4>Total deaths {START_YEAR} - {selectedYear}:
                            <MotionNumber number={total} /></h4>

                        <h5>
                            Total conflicts {START_YEAR} - {selectedYear}:
                            <MotionNumber number={allSortedConflicts.length} />
                        </h5>
                    </div>

                    <div className="Stats__Conflicts">
                        {allSortedConflicts.slice(0, 10).map((conflict) => {
                            return <ConflictItem
                                conflict={conflict}
                                property="total"
                                total={total}
                                key={conflict.dyadId + '_all'}
                            />;
                        })}
                    </div>
                </StatsBox>

                <StatsBox>
                    {(totalSelectedYear) ?
                        <h4>
                            Total deaths in {selectedYear}:
                            <span className="float-right">{formatNumber(totalSelectedYear.total)}</span>
                        </h4>
                    : null}

                    <h5>
                        Total conflict in {selectedYear}:
                        <span className="float-right">{formatNumber(sortedConflicts.length)}</span>
                    </h5>

                    {sortedConflicts.slice(0, 10).map((conflict) => {
                        return <ConflictItem
                            conflict={conflict}
                            property="bdBest"
                            total={totalSelectedYear.total}
                            key={conflict.dyadId}
                        />;
                    })}
                </StatsBox>
            </div>
        )
    }
}

export default Stats;
