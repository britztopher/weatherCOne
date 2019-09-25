import {Measurement} from '../measurements/measurement';
import { HttpError } from '../errors';

exports.parseMeasurement = ({ timestamp, ...metrics }) => {
  const measurement = new Measurement();
  measurement.timestamp = new Date(timestamp);

  if (isNaN(measurement.timestamp)) throw new HttpError(400);

  for (const metric in metrics) {
    if (!metrics.hasOwnProperty(metric)) continue;

    const value = metrics[metric];
    if (isNaN(value)) throw new HttpError(400);

    measurement.setMetric(metric, +value);
  }

  return measurement;
}