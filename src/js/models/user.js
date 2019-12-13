const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

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
        maxlength: 1024
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

// ewentualnie można sie zastanowic nad uzyciem 'joi-password-complexity' jak bedzie czas
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