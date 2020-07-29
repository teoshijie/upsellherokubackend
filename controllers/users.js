const express = require('express');
const router = express.Router();
const Users = require('../models/users.js')

//show all route
router.get('/', (req, res) => {
    Users.find({}, (err, foundUsers) => {
        res.json(foundUsers);
    });
});

//check username route
router.post('/', (req, res) => {
    Users.find({username: req.body.username}, (err, foundUsers) => {
        res.json(foundUsers);
    });
});

//create user route 
router.post('/new', (req, res) => {
    Users.create(req.body, (err, createdUser) => {
        res.json(createdUser); //.json() will send proper headers in response so client knows it's json coming back 
    });
});

//create Delete route 
router.delete('/:userID', (req, res) => {
    Users.findByIdAndRemove(req.params.userID, (err, deletedUser) => {
        res.json(deletedUser);
    });
});

//create Update route
router.put('/:userID', (req, res) => {
    Users.findByIdAndUpdate(req.params.userID, req.body, {new:true}, (err, updatedUser) => {
        res.json(updatedUser);
    });
});

module.exports = router;