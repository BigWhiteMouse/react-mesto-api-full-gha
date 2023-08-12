const { validationErrorStatus } = require('../utils/consts');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = validationErrorStatus;
  }
}

module.exports = BadRequestError;
