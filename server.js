//Dependencies 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')


require('./db');


//middlewares 
app.use(cors({origin: 'http://localhost:3000' , credentials: true }));
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



