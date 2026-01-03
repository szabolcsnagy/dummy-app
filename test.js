const test = require('node:test');
const assert = require('node:assert');
const { spawn } = require('node:child_process');

test('Dummy App Response Test', async (t) => {
    // Use a random port for testing to avoid conflicts
    const testPort = 3001;
    const testMessage = 'Test Message';
    const testColor = 'green';

    const env = {
        ...process.env,
        PORT: testPort,
        APP_MESSAGE: testMessage,
        BG_COLOR: testColor
    };

    const app = spawn('node', ['index.js'], { env });

    // Wait for the server to start
    await new Promise((resolve) => {
        app.stdout.on('data', (data) => {
            if (data.toString().includes(`Server running at port ${testPort}`)) {
                resolve();
            }
        });
    });

    try {
        const res = await fetch(`http://localhost:${testPort}`);
        const body = await res.text();

        assert.strictEqual(res.status, 200, 'Status should be 200');
        assert.ok(body.includes(testMessage), `Output should include message: ${testMessage}`);
        assert.ok(body.includes(`background-color: ${testColor}`), `Output should include background color: ${testColor}`);

        console.log('Test passed successfully!');
    } finally {
        app.kill();
    }
});
