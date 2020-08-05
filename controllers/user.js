const express = require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');


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
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
})

//find by username by id route 
router.get('/:userID', (req, res) => {
    User.findById(req.params.userID, (err, foundUser) => {
        if (err) {
            res.status(500).json({ message: { msgbody: err, msgError: true } })
        } else {
            res.json(foundUser.username);
        }
    });
});

// User register 
router.post('/signup', (req, res) => {
    const { username, password, email, mobile } = req.body
    console.log(req.body)
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).json({ message: { msgbody: "Error has occured!", msgError: true } })
        } else if (user) {
            res.status(500).json({ message: { msgbody: "Username is already taken!", msgError: true } })
        } else {
            const newUser = new User({ username, password, email, mobile });
            console.log(newUser)
            newUser.save(err => {
                if (err) {
                    res.status(500).json({ message: { msgbody: "Username is already taken!", msgError: true } })
                } else {
                    res.status(201).json({ message: { msgbody: "Account successfully create", msgError: false } })
                }
            })
        }
    })
})

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username } });
    }
})

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: "" }, success: true });
})



module.exports = router;