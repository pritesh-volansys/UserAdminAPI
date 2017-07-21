var baseException = require('./BaseException')

// Constructor
function UserExistException() {
  baseException(1001, "User already exist");
}

UserExistException.prototype.toJson = baseException.toJson;
// export the class
module.exports = UserExistException;