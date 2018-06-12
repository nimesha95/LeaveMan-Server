var express = require('express');
import authenticate from "../middlewares/authenticate";
import moment from 'moment';

var Leave = require('../models/leave');
var LeaveStat = require('../models/leave_stats');

var router = express.Router();

/*
This is the common routing used for users
*/ 

router.post('/make_leave', authenticate, function (req, res) {
    var errors = {} 
    var cur_date = moment(moment().format('YYYY-MM-DD'));
    var given_date = moment(moment(req.body.startDate).format('YYYY-MM-DD')); 
    
    if(given_date.isBefore(cur_date)){
        errors.err_msg = "You've selected an invalid date"
        res.status(400).json(errors);
        //need to think abouth how to make leaves same day *********
    } 
    else{
        var newLeave = new Leave({
            username: req.currentUser.username,
            date_moment: req.body.startDate,
            date: moment(req.body.startDate).format('YYYY-MM-DD'),
            type: req.body.leave_type,
            reason: req.body.reason ,
            timestamp: Date.now()
        });

        Leave.createLeave(newLeave, function (err, user) {
            if (err) {
                res.status(400).json(err);
            } else {
                if(req.body.leave_type=="full"){
                    LeaveStat.update({ username: "admin" }, { $inc: { 'remaining_leave.full': -1 } }, function (err, result) {
                        if (err) {
                          console.log(err);
                        }
                      });
                }
                else if(req.body.leave_type=="half"){
                    LeaveStat.update({ username: "admin" }, { $inc: { 'remaining_leave.half': -1 } }, function (err, result) {
                        if (err) {
                          console.log(err);
                        }
                      });
                }
                else if(req.body.leave_type=="sick"){
                    LeaveStat.update({ username: "admin" }, { $inc: { 'remaining_leave.sick': -1 } }, function (err, result) {
                        if (err) {
                          console.log(err);
                        }
                      });
                }
                res.json({
                    sucess: true
                });
            }
        });
    }
});


router.get('/leave_info_summary', function (req, res) {
    if(req.query.type == "paid"){
        res.json({data: [["Effort", "Amount given"], ["paid", 70],["My all2", 20]]});
    }
    else if(req.query.type == "sick"){
        res.json({data: [["Effort", "Amount given"], ["sick", 50],["My all2", 20]]});
    }
    else if(req.query.type == "half"){
        res.json({data: [["Effort", "Amount given"], ["half", 20],["My all2", 20]]});
    }
});

router.post('/edit_leave', authenticate, function (req, res) {
    res.json({user_info: "It works"});
});

router.post('/cancel_leave', authenticate, function (req, res) {
    res.json({user_info: "It works"});
});

router.post('/approve_leave', authenticate, function (req, res) {
    res.json({user_info: "It works"});
});

module.exports = router;
