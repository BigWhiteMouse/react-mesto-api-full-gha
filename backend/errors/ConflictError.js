const { conflictErrorStatus } = require('../utils/consts');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = conflictErrorStatus;
  }
}

module.exports = ConflictError;
