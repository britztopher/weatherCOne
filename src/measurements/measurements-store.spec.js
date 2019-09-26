import db from "../database/cacheDB";
import * as store from '../measurements/measurement-store';
import { Measurement } from "./measurement";

describe('when adding measurements to the database', () => {

  it('should create the measurement in db', () => {
    const measurement = new Measurement();
    measurement.timestamp = new Date('2015-09-01T16:00:00.000Z');
    measurement.setMetric('temperature', 27.1)
    measurement.setMetric('dewPoint', 16.9)

    store.add(measurement);
    expect(db[0]).toBeDefined();
    expect(db[0].temperature).toBe(27.1)
  });

  it('should throw server error trying to insert bad data', () => {
    expect(() => {
      store.add('octopus');
    }).toThrow();
  });
})

describe('when fetching one measurement from  the database', () => {

  it('should should fetch the measurement based on timestamp', () => {
    let timestamp = new Date('2015-09-01T16:00:00.000Z');
    let measurement = store.fetch(timestamp);
    
    expect(measurement.metrics.get('temperature')).toBe(27.1)
  });

  it('should return 404 when a measurement is not found in db', () => {
    let timestamp = new Date('2015-09-10T16:00:00.000Z');
    let measurement = store.fetch(timestamp);

    expect(measurement).toBeUndefined()
  });
});

describe('when fetching measurements based on dateTime range', () => {

  const measurement = new Measurement();
    measurement.timestamp = new Date('2015-09-01T16:00:00.000Z');
    measurement.setMetric('temperature', 27.1)
    measurement.setMetric('dewPoint', 16.9)
  
  store.add(measurement);

  measurement.timestamp = new Date('2015-09-02T16:00:00.000Z');
  store.add(measurement);

  measurement.timestamp = new Date('2015-09-03T16:00:00.000Z');
  store.add(measurement);

  measurement.timestamp = new Date('2015-10-01T16:00:00.000Z');
  store.add(measurement);

  it('should should fetch the measurements bases on date range', () => {
    let from = new Date('2015-09-01T16:00:00.000Z');
    let to = new Date('2015-09-04T16:00:00.000Z');

    let measurements = store.queryDateRange(from, to);
    expect(db.length).toBe(5);
    expect(measurements.length).toBe(4)
  
  });

})