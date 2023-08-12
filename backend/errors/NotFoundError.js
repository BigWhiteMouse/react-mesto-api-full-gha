const { notFoundErrorStatus } = require('../utils/consts');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = notFoundErrorStatus;
  }
}

module.exports = NotFoundError;
