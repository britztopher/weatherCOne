import { Measurement } from './measurement';
import { HttpError } from '../errors';
import db from "./measurements.db";
import * as utils from '../common/utils';

/**
 * Add new measurement
 * @param {Measurement} measurement to be added
 */
exports.add = (measurement) => {
  try {

    let { timestamp, metrics } = measurement;
    let dbRecord = {};

    //FIXME:: should i make this a class and then pass measurement as ctor arg?
    dbRecord.timestamp = new Date(timestamp).toISOString();

    for (const [key, value] of metrics.entries()) {
      dbRecord[key] = value;
    }

    db.push(dbRecord);
    console.log(db)

  } catch (e) {
    throw new HttpError(204);
  }

}

/**
 * Get existing measurement
 * @param {Date} timestamp when measurement was taken
 * @returns {Measurement} measurement for the particular date
 */
exports.fetch = (dbtimestamp) => {


  let dbRecord = db.find(metrics => {
    return metrics.timestamp === dbtimestamp.toISOString();
  })

  if (!dbRecord) {
    throw new HttpError(404);
  }

  console.log('DBRECORD::', dbRecord)
  let { timestamp, ...metrics } = dbRecord;
  
  return utils.parseMeasurement({ timestamp, ...metrics })

}

/**
 * Get the measurements within the given date range
 * @param {Date} start Lower bound for the query, inclusive
 * @param {Date} end Upper bound for the query, exclusive
 */
export function queryDateRange(from, to) {
  throw new HttpError(501);
}
