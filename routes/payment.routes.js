const paymentController = require('../controller/payment.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const paymentMiddlewares = require('../middlewares/payment.middewares');

const routes = (app) => {

    //create payment route left

    app.get(
        '/mba/api/v1/payments/:id',
        authMiddlewares.isAuthenticated,
        paymentController.getPaymentDetailsById
    );
};

module.exports = routes;