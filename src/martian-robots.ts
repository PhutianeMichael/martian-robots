interface Position {
            x: number;
            y: number;
        }

        interface Robot {
            id: number;
            position: Position;
            direction: string; // 'N', 'E', 'S', 'W'
        }

        interface Coordinates {
            directionX: number;
            directionY: number;
        }

        interface Grid {
            maxX: number;
            maxY: number;
        }

        interface Input {
            grid: Grid;
            robots: Robot[];
            instructions: string[];
        }

        const parseInput = (lines: string[]): Input => {
            const [maxX, maxY] = lines[0].split(' ').map(Number);
            const grid: Grid = { maxX, maxY };
            const robots: Robot[] = [];
            const instructions: string[] = [];
            let index = 1;
            let robotId = 1;
            while (index < lines.length) {
                const positionLine = lines[index].split(/\s+/);
                index++;
                if (positionLine.length < 3 || index >= lines.length) continue;
                const x = parseInt(positionLine[0]);
                const y = parseInt(positionLine[1]);
                const direction = positionLine[2];
                robots.push({
                    id: robotId++,
                    position: { x, y },
                    direction
                });
                instructions.push(lines[index].trim());
                index++;
            }
            return { grid, robots, instructions };
        };

        export function processRobots(input: Input): string[] {
            const scents = new Set<string>();
            const directions = ['N', 'E', 'S', 'W'] as const;
            type Direction = typeof directions[number];
            const directionMap: Record<Direction, Coordinates> = {
                'N': { directionX: 0, directionY: 1 },
                'E': { directionX: 1, directionY: 0 },
                'S': { directionX: 0, directionY: -1 },
                'W': { directionX: -1, directionY: 0 }
            };
            const results: string[] = [];
            for (let i = 0; i < input.robots.length; i++) {
                let { position, direction } = input.robots[i];
                let x = position.x;
                let y = position.y;
                let isLost = false;
                for (const inst of input.instructions[i]) {
                    if (inst === 'L' || inst === 'R') {
                        const currentIdx = directions.indexOf(direction as Direction);
                        let newIdx;
                        if (inst === 'L') {
                            newIdx = (currentIdx + 3) % 4;
                        } else {
                            newIdx = (currentIdx + 1) % 4;
                        }
                        direction = directions[newIdx];
                    } else if (inst === 'F') {
                        const { directionX, directionY } = directionMap[direction as Direction];
                        const nextX = x + directionX;
                        const nextY = y + directionY;
                        if (nextX < 0 || nextX > input.grid.maxX || nextY < 0 || nextY > input.grid.maxY) {
                            const currentPosKey = `${x},${y},${direction}`;
                            if (scents.has(currentPosKey)) {
                                continue;
                            } else {
                                scents.add(currentPosKey);
                                isLost = true;
                                break;
                            }
                        } else {
                            x = nextX;
                            y = nextY;
                        }
                    }
                }
                let result = `${x} ${y} ${direction}`;
                if (isLost) {
                    result += ' LOST';
                }
                results.push(result);
            }
            return results;
        }

        const main = () => {
            const userInputFile = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
            if (userInputFile.length < 1) return;
            const input: Input = parseInput(userInputFile);
            const results = processRobots(input);
            results.forEach(res => console.log(res));
        };

        if (require.main === module) {
            main();
        }
