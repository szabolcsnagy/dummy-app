# Simple Node.js App & Dockerization

This is a minimalist Node.js application optimized for CI/CD pipeline testing.

## Features

## Prerequisites

- **Docker**: Required to run the Redis database for local development.

### Node.js Application
- Uses the built-in `http` module (no dependencies required).
- Supports `PORT` and `APP_MESSAGE` environment variables.

### Dockerization
- Uses `node:24-alpine` for a lightweight and secure image.
- Optimized for production with only necessary files included.

## Verification Results

### Blue-Green Deployment Demo
The app returns an HTML page with a background color configurable via the `BG_COLOR` environment variable.

```bash
# Run as 'blue' version
BG_COLOR=blue npm start

# Run as 'green' version
BG_COLOR=green npm start
```

## How to use


### Run Locally

```bash
npm install
npm dev
```

### Development Mode

To start the application in development mode with a local Redis instance:

```bash
npm run dev
```

This script will:
1. Start a Redis container using Docker.
2. Start the application with `nodemon` for automatic restarts on code changes.
3. Connect the application to the local Redis instance.


### Run production mode locally
Start the redis container separately and then start the application.

```bash
npm run redis:start
npm start
```

### Run Tests
```bash
# Start redis if it is not running
npm run redis:start
npm test
```

### Environment Variables

- `PORT`: The port the server listens on (default: `3000`).
- `APP_MESSAGE`: The message returned by the HTTP server (default: `Hello from the dummy app!`).
