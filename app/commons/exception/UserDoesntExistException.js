var baseException = require('./BaseException')

// Constructor
function UserDoesntExistException() {
  baseException(1001, "User Does not Exit.");
}

UserDoesntExistException.prototype.toJson = baseException.toJson;
// export the class
module.exports = UserDoesntExistException;