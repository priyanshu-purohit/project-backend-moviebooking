const mongoose = require('mongoose');

//Define the schema of the movie resource to be stored in the DB 

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 5
    },
    casts: {
        type: [String],
        required: true
    },
    trailerUrl: {
        type: String,
        required: true
    },
    language: {
        type: [String],
        required: true,
        default: "English"
    },
    releasedDate: {
        type: String,
        required: true
    },
    releasedStatus: {
        type: String,
        required: true,
        default: "RELEASED"
    },
    director: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie; 