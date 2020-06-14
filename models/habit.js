const mongoose = require('mongoose');

const habitSchema  = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:[{
        type:String
    }]

},{timestamps:true});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;