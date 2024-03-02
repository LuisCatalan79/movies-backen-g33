const { getAll, create, getOne, remove, update } = require('../controllers/actor.controllers');
const express = require('express');

const actorRouter = express.Router();

actorRouter.route('/actors')
    .get(getAll)
    .post(create);

actorRouter.route('/actors/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = actorRouter;