const bcrypt = require('bcrypt');
const _ = require('lodash');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid user or password.');

    const validPass =  await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid user or password.');

    const token = jwt.sign({ _id: user._id }, process.env.JWT);
    res.send(token);
});

function validate(req) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required(),
    });
  
    return schema.validate(req);
}

module.exports = router;
