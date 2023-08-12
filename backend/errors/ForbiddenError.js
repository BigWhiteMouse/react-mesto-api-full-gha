const { forbiddenErrorStatus } = require('../utils/consts');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = forbiddenErrorStatus;
  }
}

module.exports = ForbiddenError;
