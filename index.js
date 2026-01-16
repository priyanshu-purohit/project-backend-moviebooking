const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

env.config();
const app = express();//express app object

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log('Hitting /home'); 
    return res.json({
        success: true
    });
})

app.listen(3000, async () => {
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