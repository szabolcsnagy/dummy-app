# Simple Node.js App & Dockerization

This is a minimalist Node.js application optimized for CI/CD pipeline testing.

## Features

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
npm start
```

### Run Tests
```bash
npm test
```

### Environment Variables

- `PORT`: The port the server listens on (default: `3000`).
- `APP_MESSAGE`: The message returned by the HTTP server (default: `Hello from the dummy app!`).
