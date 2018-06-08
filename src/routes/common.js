var express = require('express');
import authenticate from "../middlewares/authenticate";

var router = express.Router();

router.post('/', authenticate, function (req, res) {
    res.json({user_info: "It works"});
});

router.post('/make_leave', authenticate, function (req, res) {
    res.json({user_info: "It works"});
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
