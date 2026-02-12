const badRequestResponse = {
    successs: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
};
const { STATUS_CODES } = require('../utils/constants');

/**
 * 
 * @param req -> HTTP requrest object
 * @param {*} res -> HTTP response object
 * @param {*} next -> next middleware function
 * @returns -> whether the request is valid or not
 */
const validateMovieCreateRequest = async(req, res, next) => {
    // validate the movie name
    if(!req.body.name){
        badRequestResponse.err = "The name of the movie is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the movie description
    if(!req.body.description){
        badRequestResponse.err = "The description of the movie is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
    }

    // validate the casts
    if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length <= 0){
        badRequestResponse.err = "The casts of the movie is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
    }

    // validate trailer URL
    if(!req.body.trailerUrl){
        badRequestResponse.err = "The trailer of the movie is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
    }

    // validate released status
    if(!req.body.releasedStatus){
        badRequestResponse.err = "The released status of the movie is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
    }

    // validate released date
    if(!req.body.releasedDate){
        badRequestResponse.err = "The release date of the movie is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
    }
 
    // validate director
    if(!req.body.director){
        badRequestResponse.err = "The director of the movie is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
    }

    next();
}

module.exports = {
    validateMovieCreateRequest
}