var express = require('express');
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

var User = require('../models/user');
var LeaveStat = require('../models/leave_stats');

var router = express.Router();

function validateInput(data) {
    let errors = {};

    if (validator.isEmpty(data.username)) {
        errors.username = 'This field is required'
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'This field is required'
    }
    if (validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = 'This field is required'
    }
    if (!validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = "Passowrds don't match"
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
    } = validateInput(req.body);

    if (isValid) {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password,
            user_type: "emp" //emp dpt adm aca      need to get this dynamic from client
        });

        var newStat = new LeaveStat({
            username: req.body.username
        })

        User.createUser(newUser, function (err, user) {
            if (err) {
                res.status(400).json(err);
            } else {
                //handle stuff about admin user having a leave stat
                LeaveStat.createLeaveStat(newStat,function(err, user){
                    if(err) {
                        res.status(400),json(err);
                    }
                    else{
                        res.json({
                            sucess: true
                        });
                    }
                })
            }
        });
    } else {
        res.status(400).json(errors);
    }
});

module.exports = router;