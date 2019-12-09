const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 63,
        required: true
    },
    registrationDate: {
        type: Date, 
        default: Date.now
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 255
    }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
      email: Joi.string().min(5).max(63).required().email(),
      date: Joi.date(),
      password: Joi.string().min(7).max(255).required()
    };
    return Joi.validate(user, schema);
}

// export
exports.User = User;
exports.validate = validateUser;