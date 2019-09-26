import { HttpError } from '../errors';
import { Measurement } from '../measurements/measurement';

/**
 * Compute statistics for given measurements
 * @param {Measurement} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {*}
 */
export function computeStats(measurements, metrics, stats) {

  let statsAggregation = {};

  metrics.forEach(metric =>{
    statsAggregation[metric] = {};
    stats.forEach(stat=>{
      statsAggregation[metric][stat]= _performStatMath(stat, measurements, metric)
    })
  })


  return statsAggregation;
  // throw new HttpError(501);
}

const _performStatMath = (stat, measurements, metric)=>{
  let computedStat = 0;

  switch(stat){
    case 'min':{
      computedStat = Math.min(...measurements.map(measurement=> measurement[metric]))
      break;
    }
    case 'max':{
      computedStat = Math.max(...measurements.map(measurement=> measurement[metric]))
    }
  }

  return computedStat;
}  
