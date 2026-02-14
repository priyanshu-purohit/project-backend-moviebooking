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

    app.get(
        '/mba/api/v1/bookings',
        authMiddlewares.isAuthenticated,
        bookingController.getBookings
    );

    app.get(
        '/mba/api/v1/bookings/all',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdmin,
        bookingController.getBookings
    );

    app.get(
        '/mba/api/v1/bookings/:id',
        authMiddlewares.isAuthenticated,
        bookingController.getBookingById
    )
}

module.exports = routes;