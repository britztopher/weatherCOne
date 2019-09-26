import express from 'express';
import * as store from './measurement-store';

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
  if (result) res.json(utils.serializeMeasurement(result));
  else res.sendStatus(404);
});
