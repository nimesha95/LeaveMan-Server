var express = require('express');
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';
import config from '../config';

var User = require('../models/user');

var router = express.Router();

function validateLoginInput(data) {
    let errors = {};

    if (validator.isEmpty(data.username)) {
        errors.username = 'This field is required'
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'This field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

router.post('/', function (req, res) {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    if (isValid) {
        var username = req.body.username;
        var password = req.body.password;
        User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
                errors.err_msg = "Invalid Credentials"
                res.status(400).json(errors);
			}
			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
                    const token = jwt.sign({id:user._id , username:user.username},config.jwtSecret);
                    res.json({token});
				} else {
                    errors.err_msg = "Invalid Credentials"
                    res.status(400).json(errors);
				}
			});
        });
        
    } else {
        res.status(400).json(errors);
    }
});

module.exports = router;