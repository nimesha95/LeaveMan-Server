var express = require('express');
import authenticate from "../middlewares/authenticate";
var Leave = require('../models/leave');

var router = express.Router();

router.post('/toApprove', authenticate, function (req, res) {
    if(req.body._id){
        console.log(req.body._id)
        Leave.getLeaveByID(req.body._id,function(err, LeaveInfo){
            if(err) {
                res.status(400);
            }
            else{
                Leave.getLeaveByUsername(LeaveInfo.username, function (err, leaves) {
                    if(err){
                        res.status(400).json(err);
                    }
                    else{
                        res.json({LeaveInfo : LeaveInfo, LeaveHistory: leaves});
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
                res.json(toApproveLeaves);
            }
        })   
    } 
});


module.exports = router;
