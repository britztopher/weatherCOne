import * as utils from "./utils";
import { HttpError } from "../errors";

describe('when trying to parse Measurements', () => {
  it('should not allow for NaN in timestamps', () => {
    let invalidTimestamp = 'blablbah';
    expect(() => {
      utils.parseMeasurement(invalidTimestamp)
    }).toThrow(HttpError);
  });

  it('should only allow numbers for metrics', () => {
    let timestamp = '2015-09-03T16:00:00.000Z';
    let metrics = {
      dewPoint: 11.1,
      precipitation: 0,
      temperature: 24.5
    }

    const measurement = { timestamp: timestamp, metrics: metrics };

    expect(() => {
      utils.parseMeasurement(measurement)
    }).toThrow(HttpError);
  });

});