var express = require('express');
import authenticate from "../middlewares/authenticate";

var router = express.Router();

/*
This is the common routing used for users
*/ 

router.post('/', authenticate, function (req, res) {
    res.json({user_info: "It works"});
});

router.post('/make_leave', authenticate, function (req, res) {
    console.log("something1--> "+ JSON.stringify(req.body));
    res.json({user_info: "It works"});
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
