const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
        name: { type: String },
        category: { type: String },
        description: { type: String },
        image_url: [],
        quantity: { type: Number },
        price: {type: mongoose.Types.Decimal128 },
        created_date: { type: Date, default: Date.now },
        last_updated_date: { type: Date, default: Date.now },
        userID: { type: String }
});

const Listings = mongoose.model('listings', listingSchema);

module.exports = Listings;