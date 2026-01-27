const Theatre = require('../models/theatre.model');

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
            return {err: err, code: 422};
        }
        else{
            throw error;
        }
    }  
}

const deleteTheatre = async (id) => {
    try{
        const response = await Theatre.findByIdAndDelete(id);
        if(!response){
            return {
                err: "No record of a theatre found for the given id",
                code: 404
            }
        }
        return response;
    }
    catch(error){
        console.log("-----------------------------------------------------------");
        console.log("ERROR LOG", error);
        console.log("-----------------------------------------------------------");
        throw error;
    }
}

const getTheatre = async (id) => {
    try{
        const response = await Theatre.findById(id);
        if(!response){
            return {
                err: "No theatre found for the given id",
                code: 404
            }
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }  
}

const getAllTheatres = async () => {
    try{
        const response = await Theatre.find({});
        return response;
    }
    catch(error){
        console.log(error);
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
    const theatre = await Theatre.findById(theatreId);
    if(!theatre){
        return {
            err: "No such theatre found for the id provided",
            code: 404
        };
    }
    if(insert){
        //we need to add movies
        movieIds.forEach(movieId => {
            theatre.movies.push(movieId);
        });
    }
    else{
        //we need to remove movies
        let savedMovieIds = theatre.movies;
        movieIds.forEach(movieId => {
            savedMovieIds = savedMovieIds.filter(smi => smi._id.toString() !== movieId);
        });
        theatre.movies = savedMovieIds;
    }
    await theatre.save();
    return await theatre.populate('movies');
}
module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatres,
    updateMoviesInTheatres
}