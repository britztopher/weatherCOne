/**
 * Compute statistics for given measurements
 * @param {Measurement} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {*}
 */
export function computeStats(measurements, metrics, stats){

  let statsAggregation = [];

  metrics.forEach(metric => {
    //a check to make sure the stats exist for each metric within a measurement if they dont
    //then we move on 
    let metricExists = measurements.filter(measurement => measurement[metric]).length > 1;
    if (metricExists) {
      stats.forEach(stat => {
        //start building the object to place in the result array for each statistic
        let currComputedStat = {};
        currComputedStat.metric = metric;
        currComputedStat.stat = stat;

        //perform the math
        currComputedStat.value = _performStatMath(stat, measurements, metric);
        statsAggregation.push(currComputedStat);
      })
    }
  })

  return statsAggregation;
}

/**
 * private function to perform statistical calculations on given measurements
 * @param {Measurement} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {computedStat} the computed number given the measurements for data and the stat performed on that data
 */
const _performStatMath = (stat, measurements, metric) => {
  let computedStat = 0;
  //filters the measurements array by first stripping out the undefined then filters on where metrics are empty
  let filterUndefinedAndNoMetrics = measurements.filter(measurement => measurement[metric]).map(measurement => measurement[metric])

  switch (stat) {
    case 'min': {
      computedStat = Math.min(...filterUndefinedAndNoMetrics);
      break;
    }
    case 'max': {
      computedStat = Math.max(...filterUndefinedAndNoMetrics);
      break;
    }
    case 'average': {
      let filteredArr = measurements.filter(measurement => {
        return measurement[metric];
      });

      //toFixed returns a string so we have to do this bit of tomfoolery to get it back to a number;
      computedStat =+Math.fround(filteredArr.reduce((total, currVal) => {
        return total + currVal[metric]
      }, 0) / filteredArr.length).toFixed(1)
      break;
    }
  }

  return computedStat;
}  
