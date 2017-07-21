// Constructor
function BaseException(code, messageProperty) {
  // always initialize all instance properties
  this.code = code;
  this.message = messageProperty;
}

// class methods
BaseException.prototype.toJson = function() {
  return {code: this.code, message:this.message}
};

// export the class
module.exports = BaseException;