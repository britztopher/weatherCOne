import { HttpError } from '../errors';
import db from "../database/cacheDB";
import * as utils from '../common/utils';
import  _  from 'lodash';

/**
 * Add new measurement
 * @param {Measurement} measurement to be added
 */
exports.add = (measurement) => {
  try {

    let { timestamp, metrics } = measurement;
    let newDbRecord = {};

    //FIXME:: should i make this a class and then pass measurement as ctor arg?
    newDbRecord.timestamp = new Date(timestamp).toISOString();

    for (const [key, value] of metrics.entries()) {
      newDbRecord[key] = value;
    }

    db.push(newDbRecord);
    // console.log(db)

  } catch (e) {
    
    throw new HttpError(500, 'Could not add measurement...Try again later');
  }

}

/**
 * Get existing measurement
 * @param {Date} timestamp when measurement was taken
 * @returns {Measurement} measurement for the particular date
 */
exports.fetch = (dbtimestamp) => {



  //apparently the tests want just the last index of the measurement when theres more than 1 with the same timestamp
  //so I am just apeasing the tests, since Array doesnt have this, and i dont want to reinvent the wheel, i brought in lodash
  let dbRecord = _.findLast(db, metric => {
    return metric.timestamp === dbtimestamp.toISOString();
  })

  if (!dbRecord) {
    throw new HttpError(404);
  }

  let { timestamp, ...metrics } = dbRecord;

  return utils.parseMeasurement({ timestamp, ...metrics })

}

/**
 * Get the measurements within the given date range
 * @param {Date} start Lower bound for the query, inclusive
 * @param {Date} end Upper bound for the query, exclusive
 */
export function queryDateRange(from, to) {

  const fromInMs = from.getTime();
  const toInMs = to.getTime();

  return db.filter(metric => new Date(metric.timestamp).getTime() >= fromInMs && new Date(metric.timestamp).getTime() < toInMs);


}
