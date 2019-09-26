import {computeStats} from './measurement-aggregator';

const measurements = [{
  timestamp: '2015-09-01T16:00:00.000Z',
  temperature: 27.1,
  dewPoint: 16.9
},
{ timestamp: '2015-09-01T16:10:00.000Z', temperature: 27.3 },
{
  timestamp: '2015-09-01T16:20:00.000Z',
  temperature: 27.5,
  dewPoint: 17.1
},
{
  timestamp: '2015-09-01T16:30:00.000Z',
  temperature: 27.4,
  dewPoint: 17.3
},
{ timestamp: '2015-09-01T16:40:00.000Z', temperature: 27.2 },
{
  timestamp: '2015-09-01T17:00:00.000Z',
  temperature: 28.1,
  dewPoint: 18.3
}];

describe('when calculating statistics on measurements', () => {
  it('should get the minimum value of all numbers given a metric', () => {
    let stats = ['min']
    let metrics = ['temperature']
    let computedStats = computeStats(measurements, metrics, stats)
    expect(computedStats[0].value).toBe(27.1)
  });

  it('should get the maximum value of all numbers given a metric', () => {
    let stats = ['max']
    let metrics = ['dewPoint']
    let computedStats = computeStats(measurements, metrics, stats)
    expect(computedStats[0].value).toBe(18.3)
  });

  it('should get the average value of all numbers given a metric', () => {
    let stats = ['average']
    let metrics = ['dewPoint']
    let computedStats = computeStats(measurements, metrics, stats)
    expect(computedStats[0].value).toBe(17.4)
  });

  it('should not compute stats for when value doesnt exist for a given metric', () => {
    let stats = ['average']
    let metrics = ['precipitation']
    let computedStats = computeStats(measurements, metrics, stats)
    expect(computedStats).toEqual([])
  });
  
});