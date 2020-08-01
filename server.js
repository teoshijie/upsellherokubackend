//Dependencies 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');


require('./db');


//middlewares 
app.use(cors());
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json());
app.use(cookieParser());

//routes
require('./routes')(app);




//this will catch any route that doesn't exist 
app.get('*', (req, res) => {
    res.status(404).json('Sorry, page not found')
})


app.listen(PORT, () => {
    console.log('I am listening to port:', PORT)
})



