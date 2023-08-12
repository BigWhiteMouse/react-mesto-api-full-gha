const validationErrorStatus = 400;
const notFoundErrorStatus = 404;
const otherErrorStatus = 500;
const createSuccessStatus = 201;
const conflictErrorStatus = 409;
const unauthorizedErrorStatus = 401;
const forbiddenErrorStatus = 403;

/* я так поняла из ТЗ проектной работы, что пока env файл с секретным ключом создавать
не нужно, соответственно, пока
ключ для jwt храню здесь
 */
const JWT_SECRET = '7ae25051499cddd619dc0355baa085d7e9af8c0e6437fb82c724a75f568c3969npm';

// иначе eslint определяет экранирование символа / как ошибку Unnecessary escape character
// eslint-disable-next-line
const linkRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9@:%._+~#=-]{1,256}\.[a-zA-Z0-9()]{1,6}([a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=]*)/;

module.exports = {
  validationErrorStatus,
  notFoundErrorStatus,
  otherErrorStatus,
  createSuccessStatus,
  JWT_SECRET,
  linkRegex,
  conflictErrorStatus,
  unauthorizedErrorStatus,
  forbiddenErrorStatus,
};
