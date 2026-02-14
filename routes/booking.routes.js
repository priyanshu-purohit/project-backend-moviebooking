const bookingController = require('../controller/booking.controller');

const authMiddlewares = require('../middlewares/auth.middlewares');
const bookingMiddlwares = require('../middlewares/booking.middlewares');

const routes = (app) => {
    app.post(
        '/mba/api/v1/bookings',
        authMiddlewares.isAuthenticated,
        bookingMiddlwares.validateBookingCreateRequest,
        bookingController.create
    );

    app.patch(
        '/mba/api/v1/bookings/:id',
        authMiddlewares.isAuthenticated,
        bookingMiddlwares.canChangeStatus,
        bookingController.update
    ); 
}

module.exports = routes;