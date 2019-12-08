const mongoose = require('mongoose');
const Joi = require('joi');



const listSchema = new mongoose.Schema({
    name: String,
    date: {type: Date, default: Date.now},
    done: {type: Boolean, default: false}
});


const List = mongoose.model('List', listSchema);

// export