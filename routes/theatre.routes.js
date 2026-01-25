const theatreController = require('../controller/theatre.controller');
const theatreMiddleware = require('../middlewares/theatre.middlewares');

const routes = (app) => {
    app.post('/mba/api/v1/theatre', theatreMiddleware.validateTheatreCreateRequest, theatreController.create);

    app.delete('/mba/api/v1/theatre/:id', theatreController.destroy);

    app.get('/mba/api/v1/theatre/:id', theatreController.getTheatre);

    app.get('/mba/api/v1/theatre', theatreController.getTheatres);
}

module.exports = routes;