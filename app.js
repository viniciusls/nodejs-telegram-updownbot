const request = require('request');

request.get('https://www.viniciusls.com.br', (err, res, body) => console.log(err, res.statusCode, body));
