const { ValidationError } = require('mongoose').Error;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { createSuccessStatus, JWT_SECRET } = require('../utils/consts');

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(createSuccessStatus).send({ data: user }))
        .catch((err) => {
          if (err.code === 11000) next(new ConflictError('Пользователь с таким email уже существует'));
          else if (err instanceof ValidationError) next(new BadRequestError('Переданы некорректные данные'));
          else next(err);
        });
    })
    .catch(next);
}

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
}

function getUserById(req, res, next) {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(
      () => new NotFoundError('Id не найден'),
    )
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
}

function getUserMe(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
}

function updateUser(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof ValidationError) next(new BadRequestError('Переданы некорректные данные'));
      else next(err);
    });
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof ValidationError) next(new BadRequestError('Переданы некорректные данные'));
      else next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ email, id: user._id });
    })
    .catch(next);
}

function signOut(req, res) {
  res.clearCookie('token').send({ message: 'Выход' });
}

module.exports = {
  createUser, getUsers, getUserById, updateUser, updateAvatar, login, getUserMe, signOut,
};
