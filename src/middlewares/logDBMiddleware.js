// regisro para cuando se crea un producto

const fs = require('fs');

function logDBMiddleware(req, res, next){
    fs.appendFileSync('./src/logs/logDB.txt', 'Se creo un registro al ingreso en' + req.url + '\n');

    next();
}

module.exports = logDBMiddleware;