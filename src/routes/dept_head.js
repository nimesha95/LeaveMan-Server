var express = require('express');
import authenticate from "../middlewares/authenticate";
var Leave = require('../models/leave');
var User = require('../models/user');

var router = express.Router();

router.post('/toApprove', authenticate, function (req, res) {
    if(req.body._id){
        console.log(req.body._id)
        Leave.getLeaveByID(req.body._id,function(err, LeaveInfo){
            if(err) {
                res.status(400);
            }
            else{
                User.getUserByUsername(LeaveInfo.username, function (err, user_info) {
                    if(err){
                        res.status(400).json(err);
                    }
                    else{
                        Leave.getLeaveByUsername(LeaveInfo.username, function (err, leaves) {
                            if(err){
                                res.status(400).json(err);
                            }
                            else{
                                //console.log(user_info);
                                res.json({LeaveInfo : LeaveInfo, LeaveHistory: leaves, UserInfo:user_info});
                            }
                        });
                    }
                });
            }
        }) 
    }
    else{
        Leave.getToApprovedLeaves(function(err, toApproveLeaves){
            if(err) {
                res.status(400);
            }
            else{
                //console.log(toApproveLeaves);
                res.json(toApproveLeaves);
            }
        })   
    } 
});

router.post('/Approve',authenticate,function(req,res){
    Leave.ApproveLeave(req.body.data,function(err, Info){
        if(err) {
            console.log(err);
            res.status(400);
        }
        else{
            res.json({status: "updated successfully"})
        }
    });
});

router.post('/Decline',authenticate,function(req,res){
    Leave.DeclineLeave(req.body.data,function(err, Info){
        if(err) {
            console.log(err);
            res.status(400);
        }
        else{
            res.json({status: "Declined successfully"})
        }
    });
});

router.post('/Callender',authenticate,function(req,res){
    Leave.getConfirmedLeaves(function(err, Info){
        if(err) {
            console.log(err);
            res.status(400);
        }
        else{
            var schedule = [];

            Info.forEach(element => {
                var temp = {title: element.username , start: element.date_moment , end: element.date_moment}
                schedule.push(temp);
                //console.log(schedule);
            });

            res.json({schedule: schedule})
        }
    });
});


module.exports = router;
