const paymentService = require('../services/payment.services');
const { successResponseBody, errorResponseBody} = require('../utils/responsebody');
const { STATUS_CODES } = require('../utils/constants');

//function to create payment left

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

module.exports = {
    getPaymentDetailsById
}