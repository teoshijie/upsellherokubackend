const express = require('express');
const router = express.Router();
const Listings = require('../models/listings.js')

//create listing route 
router.post('/create', (req, res) => {
    Listings.create(req.body, (err, createdListing) => {
        res.json(createdListing); //.json() will send proper headers in response so client knows it's json coming back 
    });
});

//find by id route 
router.get('/:listingID', (req, res) => {
    Listings.findById(req.params.listingID, (err, foundListings) => {
        if (err) {
            res.status(500).json({ message: { msgbody: err, msgError: true } })
        } else {
            res.json(foundListings);
        }
    });
});

//create Index route 
router.get('/', (req, res) => {
    Listings.find({}, (err, foundListings) => {
        res.json(foundListings);
    });
});

//create Delete route 
router.delete('/:listingID', (req, res) => {
    Listings.findByIdAndRemove(req.params.listingID, (err, deletedListing) => {
        res.json(deletedListing);
    });
});

//create Update route
router.put('/:listingID', (req, res) => {
    Listings.findByIdAndUpdate(req.params.listingID, req.body, {new:true}, (err, updatedListing) => {
        res.json(updatedListing);
    });
});

module.exports = router;