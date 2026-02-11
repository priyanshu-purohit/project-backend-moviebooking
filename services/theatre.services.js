const Theatre = require('../models/theatre.model');
const mongoose = require('mongoose');
const { STATUS_CODES } = require('../utils/constants');

/**
 * 
 * @param data -> object containing details of the theatre to be created
 * @returns -> object with the new theatre details
 */
const createTheatre = async (data) => {
    try{
        const response = await Theatre.create(data);
        return response;
    } 
    catch(error){
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {err: err, code: STATUS_CODES.UNPROCESSABLE_ENTITY};
        }
        else{
            throw error;
        }
    }  
}

/**
 * 
 * @param id -> the unique id using which we can identify the theatre to be deleted
 * @returns -> returns the deleted theatre object
 */
const deleteTheatre = async (id) => {
    try{
        const response = await Theatre.findByIdAndDelete(id);
        if(!response){
            throw {
                err: "No record of a theatre found for the given id",
                code: STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    }
    catch(error){
        console.log("ERROR LOG", error);
        throw error;
    }
}

/**
 * 
 * @param id -> he unique id using which we can identify the theatre to be fetched
 */
const getTheatre = async (id) => {
    try{
        const response = await Theatre.findById(id);
        if(!response){
            throw {
                err: "No theatre found for the given id",
                code: STATUS_CODES.NOT_FOUND
            }
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }  
}

const getAllTheatres = async (data) => {
    try{
        let query = {};
        let pagination = {};
        if(data && data.city){
            //this checks whether city is present in query params or not
            query.city = data.city;
        }
        if(data && data.pincode){
            //this checks whether pincode is present in query params or not
            query.pincode = data.pincode;
        }
        if(data && data.name){
            //this checks whether name is present in query params or not
            query.name = data.name;
        }
        if(data && data.movieId){
            query.movies = {$all: [new mongoose.Types.ObjectId(data.movieId)]};
        }
        if(data && data.limit){
            pagination.limit = data.limit;
        }
        if(data && data.skip){
            let perPage = (data.limit) ? Number(data.limit) : 5;
            pagination.skip = data.skip*perPage;
        }
        const response = await Theatre.find(query, {}, pagination);
        return response; 
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

/**
 * 
 * @param id -> the unique id to identify the theatre to be updated
 * @param data -> data object to be used to upudate the theatre
 * @returns -> it returns the new updated theatre object
 */

const updateTheatre = async (id, data) => {
    try{
        const response = await Theatre.findByIdAndUpdate(id, data, {new: true, runValidators: true});
        if(!response){
            throw {
                err: "No theatre found for the given id",
                code: STATUS_CODES.NOT_FOUND
            }
        }
        return response;
     }
    catch(error){
        if(error.name === 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEaach((key) => {
                err[key] = error.errors[key].message;
            });
            return {err: err, code: STATUS_CODES.UNPROCESSABLE_ENTITY};
        }
        throw error;
    }
}


/**
 * 
 * @param theatreId -> unique id of the theatre for which we want to update movies
 * @param movieIds -> array of movie ids that are expected to be updated in theatre
 * @param insert -> boolean that tells wheter we want to insert movies or remove them
 * @returns -> updated theatre object
 */
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
    try{
        let theatre;
        if(insert){
            //we need to add movies
            theatre = await Theatre.findByIdAndUpdate(
                {_id: theatreId},
                {$addToSet: {
                    movies: {$each: movieIds}
                }},
                {new: true}
            )
        }
        else{
            //we need to remove movies
            theatre = await Theatre.findByIdAndUpdate(
                {_id: theatreId},
                {$pull: {
                    movies: {$in: movieIds}
                }},
                {new: true}
            )
        }
        return await theatre.populate('movies');
    }
    catch(error){
        if(error.name === 'TypeError'){
            return {
                code: STATUS_CODES.NOT_FOUND,
                err: 'No theatre found for the given id'
            }
        }
        console.log(error);
        throw error;
    }
}

const getMoviesInATheatre = async (id) => {
    try{
        const theatre = await Theatre.findById(id, {name: 1, movie: 1}).populate('movies', 'name description');
        if(!theatre){
            return {
                err: 'No theatre with the given id found',
                code: STATUS_CODES.NOT_FOUND
            }
        }
        return theatre;
    }
    catch(error){
        console.log(error);
        throw error;
    }

}

const checkMovieInATheatre = async (theatreId, movieId) => {
    try{
        let response = await Theatre.findById(theatreId);
        if(!response){
            return {
                err: 'No such theatre found for the given id',
                code: STATUS_CODES.NOT_FOUND
            }
        }
        return response.movies.indexOf(movieId) != -1;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateTheatre,
    updateMoviesInTheatres,
    getMoviesInATheatre,
    checkMovieInATheatre
}