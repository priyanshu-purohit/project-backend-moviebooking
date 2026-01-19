const movieController = require('../controller/movie.controller')

const routes = (app) => {
    //routes functino takes express app object as parameter
    app.post('/mba/api/v1/movies', movieController.createMovie);
}

module.exports = routes;