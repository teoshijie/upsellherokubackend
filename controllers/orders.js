const express = require('express');
const router = express.Router();
const Listings = require('../models/listings.js');
const Orders = require('../models/orders')

router.get('/', (req, res) => {
    Orders.find({}, (err, foundOrders) => {
        res.json(foundOrders);
    });
});

module.exports = router;