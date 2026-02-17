const { STATUS_CODES} = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;

const verifyPaymentCreateRequest = async (req, res, next) => {
    //validate booking id presence
    if(!req.body.booking){
        errorResponseBody.err = 'No booking id received';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    //validate correct booking id
    if(!ObjectId.isValid(req.body.booking)){
        errorResponseBody.err = 'Invalid booking id';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    //validate amount presence
    if(!req.body.amount){
        errorResponseBody.err = 'No amount sent';
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}


module.exports = {
    verifyPaymentCreateRequest
}