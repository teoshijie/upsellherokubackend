const { PromiseProvider } = require('mongoose');
const { populate } = require('../models/users.js');

module.exports = (app) => {
    const usersController = require('../controllers/users.js');
    app.use('/users', usersController);
    const listingsController = require('../controllers/listings.js');
    app.use('/listings', listingsController);
}