const { errorResponseBody } = require('../utils/responsebody');

/**
 * 
 * @param req -> HTTP requrest object
 * @param {*} res -> HTTP response object
 * @param {*} next -> next middleware function
 * @returns -> whether the request is valid or not
 */
const validateTheatreCreateRequest = async (req, res, next) => {
    if(!req.body.name){
        errorResponseBody.err = "The name of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.city){
        errorResponseBody.err = "The city of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.pincode){
        errorResponseBody.err = "The pincode of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    next(); //everything is fine move to the next middleware
}

const validateUpdateMovieRequest = async (req, res, next) => {
    if(req.body.insert === undefined){
        errorResponseBody.err = "The insert parameter is missing in the request";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.movies){
        errorResponseBody.err = "No movies present in the request to be updated in theatre";
        return res.status(400).json(errorResponseBody);
    }
    if(!(req.body.movies instanceof Array)){
        errorResponseBody.err = "Expected array of movies but found something else";
        return res.status(400).json(errorResponseBody);
    }
    if(req.body.movies.length == 0){
        errorResponseBody.err = "No moives present in the array provided";
        return res.status(400).json(errorResponseBody);
    }

    next();
}

module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMovieRequest
}