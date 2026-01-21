const Movie = require('../models/movie.model');
const movieService = require('../services/movie.services')

/*
Controller function to create a new movie
@returns movie created
*/

const errorResponseBody = {
    err: {},
    data: {},
    message: "Something went wrong, cannot process the request",
    success: false
};
const successResponseBody = {
    err: {},
    data: {},
    message: "Successfully fetched the data",
    success: true
};

const createMovie = async (req, res) => {
    try{
        const movie = Movie.create(req.body);

        return res.status(201).json({
            success: true,
            error: {},
            data: movie,
            message: "Successfully created a new movie"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: true,
            error: err,
            data: {},
            message: "Something went wrong"
        })
    }
}

const deleteMovie = async (req, res) => {
    try{
        const response = await Movie.deleteOne({
            _id: req.params.movieId
        });

        return res.status(200).json({
            success: true,
            error: {},
            message: "successfully deleted the movie",
            data: response
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err, 
            message: "Something went wrong",
            data: {}
        });
    }
}

const getMovie = async (req, res) => {
    try{
        const response = await movieSedrvice.getMovieById(req.params.id);
        if(response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        } 
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    }
    catch(err){
        console.log(err);
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    createMovie,
    deleteMovie,
    getMovie
};