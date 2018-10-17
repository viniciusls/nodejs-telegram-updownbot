const fs = require('fs');
const ini = require('ini');
const request = require('request');

const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

const urls = config.monitor.urls;

for (const url of urls) {
    request.get(url, (err, res, body) => {
        if (res.statusCode === 200) {
            return;
        }

        // Call telegram bot to send message alerting that the application is down!
    });
}
