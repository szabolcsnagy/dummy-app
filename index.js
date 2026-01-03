const http = require('http');

const port = process.env.PORT || 3000;
const message = process.env.APP_MESSAGE || 'Hello from the dummy app!';
const bgColor = process.env.BG_COLOR || 'white';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Dummy App</title>
        <style>
          body {
            background-color: ${bgColor};
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: sans-serif;
          }
          .content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <div class="content">
          <h1>${message}</h1>
          <p>Background color: <strong>${bgColor}</strong></p>
        </div>
      </body>
    </html>
  `);
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
    console.log(`Response message: ${message}`);
    console.log(`Background color: ${bgColor}`);
});

