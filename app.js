const request = require('request');

request.get('https://www.viniciusls.com.br', (err, res, body) => {
    if (res.statusCode === 200)
        return;

    // Call telegram bot to send message alerting that the application is down!
});
