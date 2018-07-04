var express = require('express');
import authenticate from "../middlewares/authenticate";
var User = require('../models/user');
var Leave = require('../models/leave');
var Leave = require('../models/leave');
var router = express.Router();

router.post('/chart_stat', authenticate, function (req, res) {
    Leave.getAllLeaves(function(err , things){
        if(err) throw err;
        var arr = [];
        things.forEach(element => {
            arr.push(element.date);
        });
        var counts = {};
        for (var i = 0; i < arr.length; i++) {
            counts[arr[i]] = 1 + (counts[arr[i]] || 0);
        }
        res.json({counts: counts});
    })

    //res.json(req.headers['authorization']);
});

router.post('/getEmpStat', authenticate, function (req, res) {
var username = req.body.uname;
User.getUserByUsername(username, function (err, user) {
    if (err) throw err;
    if (!user) {
        res.json({
            type: 400,
            errors: {
                empid: "Invalid Credentials"
            }
        });
    } else {
        User.getUserByUsername(username, function (err, user_info) {
            if (err) {
                res.status(400).json(err);
            } else {
                Leave.getLeaveByUsername(username, function (err, leaves) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        //console.log(user_info);
                        res.json({
                            LeaveHistory: leaves,
                            UserInfo: user_info
                        });
                    }
                });
            }
        });
    }
})
});

module.exports = router;