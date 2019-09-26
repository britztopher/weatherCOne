import {Measurement} from '../measurements/measurement';
import { HttpError } from '../errors';

exports.parseMeasurement = ({ timestamp, ...metrics }) => {
  const measurement = new Measurement();
  measurement.timestamp = new Date(timestamp);

  if (isNaN(measurement.timestamp)) throw new HttpError(400, 'timestamp is invalid');

  //changed as per hasOwnProperty directly on object prototype can cause Denial-of-Service attacks
  for (const metric in metrics) {
    if (!Object.prototype.hasOwnProperty.call(metrics, metric)) continue;

    const value = metrics[metric];
    if (isNaN(value)|| value < 0) throw new HttpError(400, 'metric value is either NaN or Negative');

    measurement.setMetric(metric, +value);
  }

  return measurement;
}