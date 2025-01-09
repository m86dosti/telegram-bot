const https = require('https');

exports.handler = async (event) => {
    const token = '803****9020:**************CJEydCJyMu3jzJ_w';
    const message = {
        chat_id: event.body.message.chat.id,
        text: 'سلام.'
    };

    const options = {
        hostname: 'api.telegram.org',
        path: `/bot${token}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                resolve({ statusCode: 200, body: 'Message sent' });
            });
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
            reject({ statusCode: 500, body: `Error: ${e.message}` });
        });

        req.write(JSON.stringify(message));
        req.end();
    });
};
