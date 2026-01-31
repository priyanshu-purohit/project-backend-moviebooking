const theatreServices = require('../services/theatre.services');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const create = async (req, res) => {
    try{
        const response = await theatreServices.createTheatre(req.body);
        if(response.err){
            errorResponseBody.err = response.err;
            errorResponseBody.message = "Validation failed on few paramters of the request body";
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.message = 'Successfully created the theatre';
        successResponseBody.data = response;
        return res.status(201).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

const destroy = async (req, res) => {
    try{
        const response = await theatreServices.deleteTheatre(req.params.id);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the given theatre";
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error; 
        return res.status(500).json(errorResponseBody);
    }
}

const getTheatre = async (req, res) => {
    try{
        const response = await theatreServices.getTheatre(req.params);
        if(response.err){
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.message = "Succesfully fetched the data of the theatre";
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}

const getTheatres = async (req, res) => {
    try{
        const response = await theatreServices.getAllTheatres(req.query);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched all the theatres";
        return res.status(200).json(successResponseBody); 
    }
    catch(error){
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
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
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody);
    }
}
module.exports = {
    create,
    destroy,
    getTheatre,
    getTheatres,
    updateMovies
}