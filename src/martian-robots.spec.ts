import { processRobots } from './martian-robots';

describe('processRobots', () => {
  it('should process robots and return correct final positions (sample input)', () => {
    const input = {
      grid: { maxX: 5, maxY: 3 },
      robots: [
        { id: 1, position: { x: 1, y: 1 }, direction: 'E' },
        { id: 2, position: { x: 3, y: 2 }, direction: 'N' },
        { id: 3, position: { x: 0, y: 3 }, direction: 'W' }
      ],
      instructions: [
        'RFRFRFRF',
        'FRRFLLFFRRFLL',
        'LLFFFLFLFL'
      ]
    };
    const result = processRobots(input);
    expect(result).toEqual([
      '1 1 E',
      '3 3 N LOST',
      '2 3 S'
    ]);
  });

  it('should handle robots not getting lost', () => {
    const input = {
      grid: { maxX: 2, maxY: 2 },
      robots: [
        { id: 1, position: { x: 0, y: 0 }, direction: 'N' }
      ],
      instructions: [
        'FFRFF'
      ]
    };
    const result = processRobots(input);
    expect(result).toEqual(['2 2 E']);
  });

  it('should handle robots getting lost and leaving a scent', () => {
    const input = {
      grid: { maxX: 1, maxY: 1 },
      robots: [
        { id: 1, position: { x: 1, y: 1 }, direction: 'N' },
        { id: 2, position: { x: 1, y: 1 }, direction: 'N' }
      ],
      instructions: [
        'F',
        'F'
      ]
    };
    const result = processRobots(input);
    expect(result).toEqual(['1 1 N LOST', '1 1 N']);
  });
});
