const fs = require('fs');
const ini = require('ini');
const request = require('request');
const Telegram = require('telegraf/telegram');

const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
const telegramConfig = ini.parse(fs.readFileSync('./telegram.ini', 'utf-8'));

const telegram = new Telegram(telegramConfig.token);

const urls = config.monitor.urls;

for (const url of urls) {
    request.get(url, (err, res, body) => {
        if (res.statusCode === 200) {
            return;
        }

        const message = 'The application located at ${url} is DOWN!';
        // Call telegram bot to send message alerting that the application is down!
        telegram.sendMessage(telegramConfig.chatId, message)
            .then()
            .catch(() => {
                throw new InternalError('Error on sending message! Message: ${message}');
            });
    });
}
