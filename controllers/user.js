const express = require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const Listings = require('../models/listings');


const signToken = userID => {
    return JWT.sign({
        iss: "superdanny",
        sub: userID
    }, "superdanny", { expiresIn: "1h" })
}

//find all route
router.get('/', (req, res) => {
    User.find({}, (err, foundUser) => {
        res.json(foundUser);
    });
});

router.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username, _id } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, _id } });
})

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: "" }, success: true });
})
//find by username by id route 
router.get('/:userID', (req, res) => {
    User.findById(req.params.userID, (err, foundUser) => {
        if (err) {
            res.status(500).json({ message: { msgbody: err, msgError: true } })
        } else {
            foundUser.password = null;
            res.json(foundUser);
        }
    });
});

// User register 
router.post('/signup', (req, res) => {
    const { username, password, email, mobile } = req.body
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).json({ message: "Error has occured!"} )
        } else if (user) {
            res.status(500).json({ message: "Username is already taken!"})
        } else {
            const newUser = new User({ username, password, email, mobile });
            newUser.save(err => {
                if (err) {
                    res.status(500).json({ message: "Username is already taken!"})
                } else {
                    res.status(201).json({ message: "Account successfully create"})
                }
            })
        }
    })
})

router.post('/create',passport.authenticate('jwt',{session : false}),(req,res)=>{
    console.log('reqbody'+ req.body)
    const listing = new Listings(req.body);
    console.log('listing'+ listing)
    listing.save(err=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            console.log('requser'+ req.user)
            listing.userID = req.user;
            listing.save(err=>{ if(err)
                res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else {
                    res.status(200).json({message : {msgBody : "Successfully created listing", msgError : false}});
                }})
            }
    })
});


router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const info = req.user;
            info.password = null;
        const token = signToken(info._id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: info});
    }
})




module.exports = router;