const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');


const MovieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes');

env.config();
const app = express();//express app object

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MovieRoutes(app); // invoking movie routes
theatreRoutes(app); // invoking theatre routes

app.get('/', (req, res) => {
    console.log('Hitting /home'); 
    return res.json({
        success: true
    });
})

app.listen(process.env.PORT, async () => {
    //this callback gets executed once we successfully start the server on the given port
    console.log(`listening on the PORT ${process.env.PORT} !!`);

    try{
        await mongoose.connect(process.env.DB_URL);//connects to the mongo server
        console.log("Successfully connected to mongo");
        // await Movie.create({
        //     name: "Bacchan Pandey",
        //     description: "Comedy masala movie",
        //     casts: ["Akshay Kumar", "Kriti Sanon", "Jaqueline Fernandiz"],
        //     director: "Farhad Samji",
        //     trailerUrl: "http://bacchanpandey/trailers/1",
        //     language: "Hindi",
        //     releasedDate: "18-03-2022",
        //     releaseStatus: "RELEASED"
        // })
    }
    catch(err){
        console.log("Couldn't connect to mongo", err);
    }
})