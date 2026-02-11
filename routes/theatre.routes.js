const theatreController = require("../controller/theatre.controller");
const theatreMiddleware = require("../middlewares/theatre.middlewares");
const authMiddleware = require("../middlewares/auth.middlewares");

const routes = (app) => {

    //CREATE
    app.post('/mba/api/v1/theatre',
        authMiddleware.isAuthenticated,
        authMiddleware.isClient,
        theatreMiddleware.validateTheatreCreateRequest,
        theatreController.create
    );

    //DELETE
    app.delete('/mba/api/v1/theatre/:id',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient, 
        theatreController.destroy
    );

    //READ
    app.get('/mba/api/v1/theatre/:id', theatreController.getTheatre);

    //READ
    app.get('/mba/api/v1/theatre', theatreController.getTheatres);

    app.patch('/mba/api/v1/theatre/:id', theatreController.updateMovies);

    app.put('/mba/api/v1/theatre/:id', theatreController.updateMovies);

    app.get('/mba/api/v1/theatre/:id/movies', theatreController.getMovies);

    app.get('/mba/api/v1/theatre/:theatreId/movies/:movieId', theatreController.checkMovie);
}

module.exports = routes;
