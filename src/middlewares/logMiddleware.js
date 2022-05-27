const fs = require('fs'); // Requiriendo fs para registrar las turas que hacen lños usuarios

function logMiddleware(req, res, next){
    fs.appendFileSync('./src/logs/log.txt', 'Se ingreso en' + req.url + '\n');

    next();
}

module.exports = logMiddleware;