const { otherErrorStatus } = require('../utils/consts');

module.exports = ((err, req, res, next) => {
  const { statusCode = otherErrorStatus, message } = err;
  res.status(statusCode).send({ message: statusCode === otherErrorStatus ? 'На сервере произошла ошибка' : message });
  next();
});
