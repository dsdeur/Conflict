import d3 from 'd3';
import _ from 'lodash';

export function getBRDData(callback) {
    d3.csv('/src/brd.csv')
        .row(d => {
            return {
                battleLocation: d.BattleLocation,
                bdBest: +d.BdBest,
                bdHigh: +d.BdHigh,
                bdLow: +d.BdLow,
                conflictId: +d.ConflictID,
                dyadId: +d.DyadId,
                GWNoA: d.GWNoA,
                GWNoA2nd: d.GWNoA2nd,
                GWNoB: d.GWNoB,
                GWNoB2nd: d.GWNoB2nd,
                GWNoBattle: d.GWNoBattle,
                GWNoLoc: d.GWNoLoc,
                incompatibility: d.Incompatibility,
                locationInc: d.LocationInc,
                region: d.Region,
                sideA: d.SideA,
                sideA2nd: d.SideA2nd,
                sideB: d.SideB,
                sideB2nd: d.SideB2nd,
                sideBID: d.SideBID,
                territoryName: d.TerritoryName,
                typeOfConflict: d.TypeOfConflict,
                version: d.Version,
                year: +d.Year
            }
        })
        .get((error, rows) => {
            callback(error, rows);
        });
}

export function prepareData(data) {
    let transformedData = [];
    let allDyadIds = [];

    data.forEach(row => {
        let year = _.find(transformedData, point => {
            return point.year == row.year;
        });

        if(!year) {
            year = {year: row.year};
            transformedData.push(year);
        }

        year[row.dyadId] = row.bdBest;
        allDyadIds.push(row.dyadId);
    });

    let uniqIds = _.uniq(allDyadIds, true);
    return {preparedData: _.sortBy(fillYears(transformedData, uniqIds), 'year'), uniqIds};
}

export function getTotalsPerYear(preparedData) {
    return preparedData.map((obj) => {
        return {
            year: obj.year,
            total: _.sum(_.omit(obj, 'year'))
        }
    });
}

export function getTotalsPerConflict(uniqIds, preparedData) {
    return uniqIds.map((id) => {
        let total = _.sum(preparedData.map((x) => {
            return x[id];
        }));

        return {
            total: total,
            dyadId: id
        }
    });
}

export function getTotalsPYPC(data, totalsPerYear) {
    let years = {};

    totalsPerYear.forEach((year) => {
        let yearTotalCPY = {
            year: year.year,
        };

        let conflicts = {};
        console.log(year.year);
        data.forEach((entry) => {
            if(entry.year <= year.year) {
                if(!conflicts[entry.dyadId]) {
                    conflicts[entry.dyadId] = entry;
                    conflicts[entry.dyadId].total = 0;
                }

                conflicts[entry.dyadId].total += entry.bdBest;
            }
        });

        yearTotalCPY.conflicts = _.sortByOrder(_.values(conflicts), 'total', 'desc');
        console.log(yearTotalCPY.conflicts);
        years[year.year] = yearTotalCPY;
    });

    console.log(years);
    return years;
}

function fillYears(data, dyadIds) {
    let idsObj = {};

    dyadIds.forEach(id => {
        idsObj[id] = 0;
    });

    let completeData = data.map(year => {
        return _.assign({}, idsObj, year);
    });

    // idsObj.year = 1988;
    // completeData.unshift(idsObj);

    return completeData;
}
