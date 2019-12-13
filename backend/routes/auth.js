const bcrypt = require('bcryptjs');
const Joi = require('joi');
const _ = require('lodash');
const {User} = require('../models/user.js');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//check user data - authentication
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or passwword.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or passwword.');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(user) {
    const schema = {
      email: Joi.string().min(5).max(63).required().email(),
      password: Joi.string().min(7).max(255).required()
    };
    return Joi.validate(user, schema);
}

module.exports = router;