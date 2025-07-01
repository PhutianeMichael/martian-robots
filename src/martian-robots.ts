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

        const main = () => {
            const userInputFile = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
            if (userInputFile.length < 1) return;
            const [maxX, maxY] = userInputFile[0].split(' ').map(Number);
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
            let index = 1;
            while (index < userInputFile.length) {
                const positionLine = userInputFile[index].split(/\s+/);
                index++;
                if (positionLine.length < 3 || index >= userInputFile.length) continue;

                let x = parseInt(positionLine[0]);
                let y = parseInt(positionLine[1]);
                let direction = positionLine[2] as Direction;
                const instructions = userInputFile[index].trim();
                index++;

                let isLost = false;
                for (const inst of instructions) {
                    if (inst === 'L' || inst === 'R') {
                        const currentIdx = directions.indexOf(direction);
                        let newIdx;
                        if (inst === 'L') {
                            newIdx = (currentIdx + 3) % 4;
                        } else {
                            newIdx = (currentIdx + 1) % 4;
                        }
                        direction = directions[newIdx];
                    } else if (inst === 'F') {
                        const {directionX, directionY} = directionMap[direction];
                        const nextX = x + directionX;
                        const nextY = y + directionY;

                        if (nextX < 0 || nextX > maxX || nextY < 0 || nextY > maxY) {
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
            results.forEach(res => console.log(res));
        };

        if (require.main === module) {
            main();
        }
