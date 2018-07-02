var express = require('express');
import authenticate from "../middlewares/authenticate";
import moment from 'moment';

import {SICK_LEAVE_COUNT , PAID_LEAVE_COUNT, HALF_DAY_COUNT} from '../const';
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
    }
    else if(moment(given_date).format('dddd') == "Sunday"){
        errors.err_msg = "You've selected a Sunday"
        res.status(400).json(errors);
    }
    else{
        var newLeave = new Leave({
            username: req.currentUser.username,
            date_moment: req.body.startDate,
            date_moment_end: req.body.endDate,
            date: moment(req.body.startDate).format('YYYY-MM-DD'),
            date_end: moment(req.body.endDate).format('YYYY-MM-DD'),
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

router.post('/leave_info_summary', authenticate, function (req, res) {
    var type = req.body.type;
    var username = req.currentUser.username;

    LeaveStat.getLeaveByUsername(username,function(err, leave_stat){
        if(err) {
            res.status(400);
        }
        else{
            leave_stat = leave_stat.remaining_leave;

            if(type == "paid"){
                res.json({data: [["remaining", "used"], ["Leaves left", leave_stat.paid],["Used", PAID_LEAVE_COUNT - leave_stat.paid]]});
            }
            else if(type == "sick"){
                res.json({data: [["remaining", "used"], ["Leaves left", leave_stat.sick],["Used", SICK_LEAVE_COUNT - leave_stat.sick]]});
            }
            else if(type == "half"){
                res.json({data: [["remaining", "used"], ["Leaves left", leave_stat.half],["Used", HALF_DAY_COUNT - leave_stat.half]]});
            }
        }
    })    
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

router.post('/leave_history', authenticate , function (req, res) {
    //this returns latest 20 items from the history
    Leave.getLeaveByUsername(req.currentUser.username, function (err, leaves) {
        if(err){
            res.status(400).json(err);
        }
        else{
            res.json({leave_history: leaves});
        }
    });
    
});

module.exports = router;
