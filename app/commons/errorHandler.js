const config = require('../../config');

var handler = {};
handler.exceptionHandler = exceptionHandler;
module.exports = handler;

function exceptionHandler(err, req, res, next){
    console.log(err);
    console.error(err.stack);    
    res.status(500).send('Something went wrong!');
}


