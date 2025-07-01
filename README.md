
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

## Running Tests

To run the tests:

```sh
npm test
```

## Input File

The application expects an `input.txt` which is provided.
