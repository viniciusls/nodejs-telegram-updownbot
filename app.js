const fs = require('fs');
const ini = require('ini');
const path = require('path');
const request = require('request');
const Telegram = require('telegraf/telegram');

console.log('Loading function');

exports.handler = (event, context, callback) => {
    const config = ini.parse(fs.readFileSync(path.resolve('./config.ini'), 'utf-8'));
    const telegramConfig = ini.parse(fs.readFileSync(path.resolve('./telegram.ini'), 'utf-8'));

    const telegram = new Telegram(telegramConfig.token);

    const urls = config.monitor.urls;

    for (const url of urls) {
        console.log(`Trying to request ${url}...`);

        request.get(url, (err, res, body) => {
            if (res && res.statusCode === 200) {
                return;
            }

            const date = new Date();

            const message = `The application located at ${url} is DOWN on ${date}!`;

            console.log(message);
            // Call telegram bot to send message alerting that the application is down!
            telegram.sendMessage(telegramConfig.chatId, message)
                .then(() => {
                    console.log('Message sent to Telegram Bot');
                    
                    callback(null, `Message about ${url} sent to Telegram Bot`);
                })
                .catch(() => {
                    callback(new InternalError('Error on sending message! Message: ${message}'));
                });
        });
    }
};
