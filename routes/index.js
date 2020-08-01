

module.exports = (app) => {
    const usersController = require('../controllers/user');
    app.use('/users', usersController);
    const listingsController = require('../controllers/listings.js');
    app.use('/listings', listingsController);
}


