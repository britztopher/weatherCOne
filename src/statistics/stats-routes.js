import express from 'express';
import { queryDateRange } from '../measurements/measurement-store';
import { computeStats } from './measurement-aggregator';

const router = express.Router();

export function register(app) {
  app.use('/stats', router);
}

router.get('/', (req, res) => {
  const metrics =  asArray(req.query.metric);
  const stats = asArray(req.query.stat);

  const fromDateTime = new Date(req.query.fromDateTime);
  const toDateTime = new Date(req.query.toDateTime);

  const measurements = queryDateRange(fromDateTime, toDateTime);

  //if there are no measurements to get stats for then dont run stats function
  if(measurements.length===0){
    res.status(404).send(measurements);
  }else{
    res.json(computeStats(measurements, metrics, stats))
  }
});

function asArray(val) {
  if (val == null) return null;

  return Array.isArray(val) ? val : [val];
}
