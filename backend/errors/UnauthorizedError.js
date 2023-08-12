const { unauthorizedErrorStatus } = require('../utils/consts');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = unauthorizedErrorStatus;
  }
}

module.exports = UnauthorizedError;
