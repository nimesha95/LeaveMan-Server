var express = require('express');
import authenticate from "../middlewares/authenticate";
var Leave = require('../models/leave');
var User = require('../models/user');

var router = express.Router();

router.post('/toConfirm', authenticate, function (req, res) {
    /*
    if (req.body._id) {
        Leave.getToConfirmedLeaves(function (err, Info) {
            if (err) {
                console.log(err);
                res.status(400);
            } else {
                res.json({
                    pending_leaves: Info.length
                })
            }
        });
    }
    */
    if (req.body._id) {
        console.log(req.body._id)
        Leave.getLeaveByID(req.body._id, function (err, LeaveInfo) {
            if (err) {
                res.status(400);
            } else {
                User.getUserByUsername(LeaveInfo.username, function (err, user_info) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        Leave.getLeaveByUsername(LeaveInfo.username, function (err, leaves) {
                            if (err) {
                                res.status(400).json(err);
                            } else {
                                //console.log(user_info);
                                res.json({
                                    LeaveInfo: LeaveInfo,
                                    LeaveHistory: leaves,
                                    UserInfo: user_info
                                });
                            }
                        });
                    }
                });
            }
        })
    } else {
        Leave.getToConfirmedLeaves(function (err, Info) {
            if (err) {
                console.log(err);
                res.status(400);
            } else {
                res.json({
                    pending_leaves: Info
                })
            }
        });
    }
});


router.post('/confirm_leave', authenticate, function (req, res) {
    Leave.ConfirmLeave(req.body.data, function (err, Info) {
        if (err) {
            console.log(err);
            res.status(400);
        } else {
            res.json({
                status: "updated successfully"
            })
        }
    });
})




module.exports = router;