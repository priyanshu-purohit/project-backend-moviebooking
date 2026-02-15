const { STATUS_CODES } = require('../utils/constants');
const ObjectId = require('mongoose').Types.ObjectId;
const { errorResponseBody } = require('../utils/responsebody');

const validateCreateShowRequest = async (req, res, next) => {
    //validate theatre id
    if(!req.body.theatreid){
        errorResponseBody.err = "No theatre provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    if(!ObjectId.isValid(req.body.theatreid)){
        errorResponseBody.err = "Invalid theatre id";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    //validate movie presence
    if(!req.body.movieId){
        errorResponseBody.err = "No movie provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.err = "Invalid movie id";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    //validate timing presence
    if(!req.body.timing){
        errorResponseBody.err = "No timing provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    //validate noOfSeats presence
    if(!req.body.noOfSeats){
        errorResponseBody.err = "No seat info provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    //validate price id
    if(!req.body.price){
        errorResponseBody.err = "No price information provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }

    next();
}

const validateShowUpdateRequest = async (req, res, next) => {
    if(req.body.theatreId || req.body.movieId){
        errorResponseBody.err = "We cannot update theatre or movie for an already added show";
        return res.status(STATUS_CODES.BAD_REQUEST).json(errorResponseBody);
    }
    next();
}

module.exports = {
    validateCreateShowRequest,
    validateShowUpdateRequest
}