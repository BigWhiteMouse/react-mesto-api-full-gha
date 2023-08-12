const { ValidationError } = require('mongoose').Error;
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const { createSuccessStatus } = require('../utils/consts');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(createSuccessStatus).send(card))
    .catch((err) => {
      if (err instanceof ValidationError) next(new BadRequestError('Переданы некорректные данные'));
      else next(err);
    });
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(
      () => new NotFoundError('Id не найден'),
    )
    .then((card) => {
      res.send(card);
    })
    .catch(next);
}

function disLikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(
      () => new NotFoundError('Id не найден'),
    )
    .then((card) => {
      res.send(card);
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .orFail(
      () => new NotFoundError('Id не найден'),
    )
    .then((result) => {
      if (req.user._id === String(result.owner)) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => res.send(card));
      } else next(new ForbiddenError('Пользователь может удалять только свои карточки'));
    })
    .catch(next);
}

module.exports = {
  getCards, createCard, likeCard, disLikeCard, deleteCard,
};
