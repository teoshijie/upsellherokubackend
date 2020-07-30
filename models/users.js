const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        username: {
                type: String,
                required: true,
                min: 6,
                max: 15
        },
        password: {
                type: String,
                required: true,
                min: 8,
                max: 15
        },
        created_date: { type: Date, default: Date.now },
        shoppingcart: [
                {
                        productID: { type: String },
                        quantity: { type: Number }
                }
        ]
});

UserSchema.pre('save', function (next) {
        if (!this.isModified('password'))
                return next();
        bcrypt.hash(this.password, 10, (err, passwordHash) => {
                if (err)
                        return next(err);
                this.password = passwordHash;
                next();
        });

});

UserSchema.methods.comparePassword = function (password, cb) {
        bcrypt.compare(password, this.password, (err, isMatch) => {
                if (err)
                        return cb(err);
                else {
                        if (!isMatch)
                                return cb(null, isMatch);
                        return cb(null, this)
                }
        })
}


const Users = mongoose.model('users', userSchema);

module.exports = Users;