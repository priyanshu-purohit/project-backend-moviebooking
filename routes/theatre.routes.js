const theatreController = require('../controller/theatre.controller');

const routes = (app) => {
    app.post('/mba/api/v1/theatre', theatreController.create);
}

module.exports = routes;