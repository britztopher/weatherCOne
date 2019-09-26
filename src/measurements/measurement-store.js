import { HttpError } from '../errors';
import db from "../database/cacheDB";
import * as utils from '../common/utils';
import  _  from 'lodash';
import logger from '../common/logger';

/**
 * Add new measurement
 * @param {Measurement} measurement to be added
 */
exports.add = (measurement) => {
  try {
    //serialize the measurement for db insertion.  since our db is just a Collection we can just push the 
    //serialized measurement object right into db.
    db.push(utils.serializeMeasurement(measurement));
    logger.info('measurement added', measurement)
  } catch (e) {
    logger.error('measurement-store:add: Could not add measurement to DB because', e)
    throw new HttpError(409, 'Could not add measurement...Try again later');
  }

}

/**
 * Get existing measurement
 * @param {Date} timestamp when measurement was taken
 * @returns {Measurement} measurement for the particular date.  If there are mulitple measurements given a specific 
 * date then will return last occurence
 */
exports.fetch = (dbtimestamp) => {
  let result;

  //apparently the tests want just the last index of the measurement when theres more than 1 with the same timestamp
  //so I am just apeasing the tests, since Array doesnt have this, and i dont want to reinvent the wheel, i brought in lodash
  let dbRecord = _.findLast(db, metric => {
    return metric.timestamp === dbtimestamp.toISOString();
  })

  //if the record exists parse it and assign it to be returned
  if (dbRecord) {
    logger.debug('measurement-store:fetch:Measurement found ', dbRecord)
    result = utils.parseMeasurement(dbRecord)
  }

  return result;
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
