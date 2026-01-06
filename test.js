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
        // First request to get count 1
        let res = await fetch(`http://localhost:${testPort}`);
        let body = await res.text();

        assert.strictEqual(res.status, 200, 'Status should be 200');
        assert.ok(body.includes(testMessage), `Output should include message: ${testMessage}`);
        assert.ok(body.includes(`background-color: ${testColor}`), `Output should include background color: ${testColor}`);
        assert.ok(body.includes('You are visitor number: <strong>1</strong>'), 'Output should include visitor count 1');

        // Request favicon
        const faviconRes = await fetch(`http://localhost:${testPort}/favicon.ico`);
        assert.strictEqual(faviconRes.status, 204, 'Favicon status should be 204');

        // Request arbitrary path
        const otherRes = await fetch(`http://localhost:${testPort}/other-path`);
        assert.strictEqual(otherRes.status, 200, 'Other path status should be 200');

        // Request again to verify count is still 2
        res = await fetch(`http://localhost:${testPort}/`);
        body = await res.text();
        assert.ok(body.includes('You are visitor number: <strong>2</strong>'), 'Visitor count should remain 2 after arbitrary request');

        console.log('Test passed successfully!');
    } finally {
        app.kill();
    }
});
