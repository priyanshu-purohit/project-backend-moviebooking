const paymentService = require('../services/payment.services');
const { successResponseBody, errorResponseBody} = require('../utils/responsebody');
const { STATUS_CODES, BOOKING_STATUS } = require('../utils/constants');

 const create = async (req, res) => {
    try{
        const response = await paymentService.createPayment(req.body);
        if(response.status == BOOKING_STATUS.expired){
            errorResponseBody.err = 'The payment took more than 5 minutes to get processed, hence your booking got expired, please try again';
            errorResponseBody.data = response;
            return res.status(STATUS_CODES.GONE).json(errorResponseBody);
        }
        if(response.status == BOOKING_STATUS.cancelled){
            errorResponseBody.err = 'The payement failed due to some reason, booking was not successfull, please try again';
            errorResponseBody.data = response;
            return res.status(STATUS_CODES.PAYMENT_REQUIRED).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = 'Booking completed successsfully';
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
 }

const getPaymentDetailsById = async (req, res) => {
    try{
        const response = await paymentService.getPaymentById(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the booking and payment details";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
        
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getAllPayments = async (req, res) => {
    try{
        const response = await paymentService.getAllPayments(req.user);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all the payments";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    create,
    getPaymentDetailsById,
    getAllPayments
}