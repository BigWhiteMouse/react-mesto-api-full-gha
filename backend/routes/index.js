const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login, signOut } = require('../controllers/users');
const { linkRegex } = require('../utils/consts');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(linkRegex),
  }),
}), createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.get('/signout', signOut);

router.use('*', (req, res, next) => {
  next(new NotFoundError(`Ресурс по адресу ${req.path} не найден`));
});

module.exports = router;
