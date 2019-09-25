import express from 'express';
import * as store from './measurement-store';
import { Measurement } from './measurement';
import { HttpError } from '../errors';
import * as utils from '../common/utils';

const router = express.Router();

export function register(app) {
  app.use('/measurements', router);
}

router.post('/', (req, res) => {
  const measurement = utils.parseMeasurement(req.body);

  store.add(measurement);

  res.location(`/measurements/${measurement.timestamp.toISOString()}`).sendStatus(201);
});

router.get('/:timestamp', (req, res) => {
  const result = store.fetch(new Date(req.params.timestamp));
  if (result) res.json(serializeMeasurement(result));
  else res.sendStatus(404);
});

function serializeMeasurement(measurement) {
  const out = { timestamp: measurement.timestamp.toISOString() };
  console.log(measurement)
  for (const [metric, value] of measurement.metrics.entries()) {
    out[metric] = value;
  }
  console.log("OUT::", out)

  return out;
}
