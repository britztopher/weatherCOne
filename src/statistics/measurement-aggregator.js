/**
 * Compute statistics for given measurements
 * @param {Measurement} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {*}
 */
export function computeStats(measurements, metrics, stats) {

  let statsAggregation = [];

  metrics.forEach(metric => {
    let statsExists = measurements.filter(measurement => measurement[metric]).length > 1;
    if (statsExists) {
      stats.forEach(stat => {
        let currComputedStat = {};
        currComputedStat.metric = metric;
        currComputedStat.stat = stat;
        currComputedStat.value = _performStatMath(stat, measurements, metric);
        statsAggregation.push(currComputedStat);
      })
    }
  })

  return statsAggregation;
}

const _performStatMath = (stat, measurements, metric) => {
  let computedStat = 0;

  switch (stat) {
    case 'min': {
      computedStat = Math.min(...measurements.filter(measurement => measurement[metric]).map(measurement => measurement[metric]))
      break;
    }
    case 'max': {
      computedStat = Math.max(...measurements.filter(measurement => measurement[metric]).map(measurement => measurement[metric]))
      break;
    }
    case 'average': {
      let filteredArr = measurements.filter(measurement => {
        return measurement[metric];

      });

      computedStat =+Math.fround(filteredArr.reduce((total, currVal) => {
        return total + currVal[metric]
      }, 0) / filteredArr.length).toFixed(1)
      break;
    }
  }

  return computedStat;
}  

