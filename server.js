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

app.use(cors({
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
    origin: frontEndUrl,
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Content-Range, X-Content-Range, Authorization',
    credentials: true
  }));

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



