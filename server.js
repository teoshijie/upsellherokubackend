//Dependencies 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const cors = require('cors');

require('./db');


//middlewares 
app.use(cors());
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json());


//routes
require('./routes')(app);

//this will catch any route that doesn't exist 
app.get('*', (req, res) => {
    res.status(404).json('Sorry, page not found')
})


app.listen(PORT, () => {
    console.log('I am listening to port:', PORT)
})



