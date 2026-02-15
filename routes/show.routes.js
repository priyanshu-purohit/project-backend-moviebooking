const showController = require('../controller/show.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const shoMiddlewares = require('../middlewares/show.middlewares');

const routes = (app) => {
    app.post(
        '/mba/api/v1/shows',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        shoMiddlewares.validateCreateShowRequest,
        showController.create
    );

    app.get(
        '/mba/api/v1/shows',
        showController.getShows
    )
}

module.exports = routes;