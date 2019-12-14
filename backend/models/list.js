const mongoose = require('mongoose');
const Joi = require('joi');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 63,
        default: 'New List'
    },
    userId: {
        type: String, //mongoose.Schema.Types.ObjectId,
        // type: Number,
        // default: 123,
        required: true
    } 
});

const List = mongoose.model('List', listSchema);

function validateList(list) {
    const schema = {
      name: Joi.string().max(63),
      userId: Joi.string().required()
    };
    return Joi.validate(list, schema);
}

// export
exports.List = List;
exports.validate = validateList;