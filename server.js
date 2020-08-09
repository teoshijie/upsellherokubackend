//Dependencies 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const frontEndUrl = process.env.Front_End_URL || 'http://localhost:3000';

require('./db');


//middlewares 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accesstoken, ApiAccessToken, Accept, AppID");
    next();
});

app.options('*', cors());
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))


//routes
require('./routes')(app);




//this will catch any route that doesn't exist 
app.get('*', (req, res) => {
    res.status(404).json('Sorry, page not found')
})


app.listen(PORT, () => {
    console.log('I am listening to port:', PORT)
})



