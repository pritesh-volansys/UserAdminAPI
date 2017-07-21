var baseException = require('./BaseException')

// Constructor
function UnhandleError() {
  baseException(500, "Not fond solution.");
}

UnhandleError.prototype.toJson = baseException.toJson;
// export the class
module.exports = UnhandleError;