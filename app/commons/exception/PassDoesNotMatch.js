var baseException = require('./BaseException')

// Constructor
function PassDoesNotMatch() {
  baseException(1017, "Invalid password.");
}

PassDoesNotMatch.prototype.toJson = baseException.toJson;
// export the class
module.exports = PassDoesNotMatch;