const theatreController = require("../controller/theatre.controller");
const theatreMiddleware = require("../middlewares/theatre.middlewares");

const routes = (app) => {

    //CREATE
    app.post('/mba/api/v1/theatre', theatreMiddleware.validateTheatreCreateRequest, theatreController.create);

    //DELETE
    app.delete('/mba/api/v1/theatre/:id', theatreController.destroy);

    //READ
    app.get('/mba/api/v1/theatre/:id', theatreController.getTheatre);

    //READ
    app.get('/mba/api/v1/theatre', theatreController.getTheatres);

    app.patch('/mba/api/v1/theatre/:id', theatreController.update);

    app.put('/mba/api/v1/theatre/:id', theatreController.update);
}

module.exports = routes;
