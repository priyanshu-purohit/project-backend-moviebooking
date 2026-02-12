const Movie = require('../models/movie.model');
const { STATUS_CODES } = require('../utils/constants');

/**
 * 
 * @param data -> object containing details of the new movie to be created 
 * @returns -> returns the new movie object created
 */
const createMovie = async (data) => {
    try{
        const movie = await Movie.create(data);
        return movie;
    }
    catch(error){
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message; 
            });
            console.log("THIS IS THE ERROR LOG",err);
            throw {err: err, code: STATUS_CODES.UNPROCESSABLE_ENTITY};
        }
        else{
            throw error;
        }
    }
}

/**
 * 
 * @param id -> id which will be used to identify the movie to be deleted
 * @returns -> object containing details the movie deleted
 */
const deleteMovie = async (id) => {
    try{
        const response = await Movie.findByIdAndDelete(id);
        if(!response){
            throw {
                err: 'No movie record found for the id provided',
                code: STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw err;
    }
    
}

/**
 * 
 * @param id -> id which will be used to identify the movie to be fetched
 * @returns -> object containing movie fetched
 */
const getMovieById = async (id) => {
    const movie = await Movie.findById(id);

    if(!movie){
        return {
            err: "No movie found for the corresponding id provided",
            code: 404
        }
    };

    return movie;
}

/**
 * 
 * @param id -> id which will be used to identify the movie to be updated
 * @param data -> object that contains actual data which is to be updated in the db
 * @returns -> returns the new updated movie details
 */
const updateMovie = async (id, data) => {
    try{
        const movie = await Movie.findByIdAndUpdate(id, data, {new: true, runValidators: true});
        return movie;
    }
    catch(error){
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log("THIS IS THE ERROR LOG",err);
            return {err: err, code: 422};
        }
        else{
            throw error;
        }
    }
}

/**
 * 
 * @param filter -> flter will hep us in filtering out data based on the conditionals
 * @returns -> returns an object containing all the movies fetched based on the filter
 */
const fetchMovies = async (filter) => {
    let query = {};
    if(filter.name){
        query.name = filter.name; 
    }
    let movies = await Movie.find(query);
    if(!movies){
        return {
            err: 'Not able to find the queries movies',
            code: 404
        }
    }
    return movies;
}

module.exports = {
    getMovieById,
    createMovie,
    deleteMovie,
    updateMovie,
    fetchMovies 
}