const mongoose = require('mongoose');

const travellSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    expenses: {
        type: Number,
        required: true
    },
    transports:{
        type: String,
        enum: ['Bus', 'Train', 'Plane', 'Car', 'Bike', 'Foot']
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const Travell = mongoose.model('Travell', travellSchema);

module.exports = Travell;