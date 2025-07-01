


What excites me most about Smartcall is the opportunity to work on solutions that directly empower entrepreneurs and support both formal and informal markets

both

# Martian Robots

This project simulates the movement of robots on a Martian grid, following a set of instructions and handling edge cases such as robots getting lost and leaving scents.

# Martian Robots

## Overview

This project simulates the movement of robots on a Martian grid based on a set of instructions, handling edge cases such as robots getting lost and leaving scents to prevent repeated losses at the same location. The solution is designed to be modular and type-safe, leveraging TypeScript interfaces to clearly define the structure of positions, robots, grids, and instructions. The main logic parses the input, processes each robot's movement, and outputs the final state of each robot, ensuring maintainability and clarity.

## Tech Stack
- **TypeScript**: Used for type safety and to define clear interfaces for all core entities (Position, Robot, Grid, Input, Coordinates).
- **Node.js**: Provides the runtime environment for executing the application and handling file I/O.
- **Jest**: (Assumed from the presence of `.spec.ts` file) Used for unit testing to ensure correctness of the logic.

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation
1. Clone the repository or download the source code.
2. Navigate to the project directory:
   ```sh
   cd martian-robots
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Running the Application

The main logic is in `src/martian-robots.ts`. To run the app:

```sh
npx ts-node src/martian-robots.ts
```

Or, if you want to compile to JavaScript first:

```sh
npm run build
node dist/martian-robots.js
```

## Running the Application with Input File
To run the application
``` sh
npm start < input.txt
```

## Running Tests

To run the tests:

```sh
npm test
```

## Input File

The application expects an `input.txt` which is provided.


