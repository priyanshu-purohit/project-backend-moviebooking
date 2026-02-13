const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

mongoose.set('debug', true);

const MovieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const bookingRoutes = require('./routes/booking.routes');

env.config();
const app = express();//express app object

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MovieRoutes(app); // invoking movie routes
theatreRoutes(app); // invoking theatre routes
authRoutes(app); // invoking auth routes
userRoutes(app); //invoking user routes
bookingRoutes(app); //invoking booking routes



app.listen(process.env.PORT, async () => {
    //this callback gets executed once we successfully start the server on the given port
    console.log(`listening on the PORT ${process.env.PORT} !!`);

    try{
        await mongoose.connect(process.env.DB_URL);//connects to the mongo server
        console.log("Successfully connected to mongo");
    }
    catch(err){
        console.log("Couldn't connect to mongo", err);
    }
})