const theatreServices = require('../services/theatre.services');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const { STATUS_CODES } = require('../utils/constants');

const create = async (req, res) => {
    try{
        const response = await theatreServices.createTheatre(req.body);
        successResponseBody.message = 'Successfully created the theatre';
        successResponseBody.data = response;
        return res.status(STATUS_CODES.CREATED).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const destroy = async (req, res) => {
    try{
        const response = await theatreServices.deleteTheatre(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the given theatre";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error; 
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getTheatre = async (req, res) => {
    try{
        const response = await theatreServices.getTheatre(req.params);
        successResponseBody.message = "Succesfully fetched the data of the theatre";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getTheatres = async (req, res) => {
    try{
        const response = await theatreServices.getAllTheatres(req.query);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all the theatres";
        return res.status(STATUS_CODES.OK).json(successResponseBody); 
    }
    catch(error){
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const update = async (req, req) => {
    try{
        const response = await theatreServices.updateTheatre(req.params.id, req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successsfully updated the theatre";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        if(error.err){
            errorResponseBody.err = error;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const updateMovies = async (req, res) => {
    try{
        const response = await theatreServices.updateMoviesInTheatres(
            req.params.id,
            req.body.movies,
            req.body.insert
        )
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated movies in the theatre";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getMovies = async (req, res) => {
    try{
        const response = await theatreServices.getMoviesInATheatre(req.params.id);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully fetched the movies for the theatre';
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const checkMovie = async (req, res) => {
    try{
        const response = await theatreServices.checkMovieInATheatre(req.params.theatreId, req.params.movieId);
        console.log(req);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = 'Successfully checked if movie is present in the theatre';
        return res.status(STATUS_CODES.OK).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
module.exports = {
    create,
    destroy,
    getTheatre,
    getTheatres,
    update,
    updateMovies,
    getMovies,
    checkMovie
}