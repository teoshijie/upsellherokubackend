const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        username: { type: String },
        password: { type: String },
        created_date: { type: Date, default: Date.now },
        shoppingcart: [
                {
                        productID: { type: String },
                        quantity: { type: Number }
                }
        ]
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;