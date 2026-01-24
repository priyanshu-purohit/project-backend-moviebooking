const theatreController = require('../controller/theatre.controller');
const theatreMiddleware = require('../middlewares/theatre.middlewares');

const routes = (app) => {
    app.post('/mba/api/v1/theatre', theatreMiddleware.validateTheatreCreateRequest, theatreController.create);
}

module.exports = routes;