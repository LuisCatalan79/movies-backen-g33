const express = require('express');
const genreRouter = require('./genre.routers');
const actorRouter = require('./actor.routers');
const directorRouter = require('./director.routers');
const movieRouter = require('./movie.routers');
const router = express.Router();

// colocar las rutas aquí
router.use(genreRouter)
router.use(actorRouter)
router.use(directorRouter)
router.use(movieRouter)

module.exports = router;