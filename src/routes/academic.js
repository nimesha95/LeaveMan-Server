var express = require('express');
import authenticate from "../middlewares/authenticate";

var router = express.Router();

router.post('/view_requests', authenticate, function (req, res) {
    res.json(req.headers['authorization']);
});

router.post('/get_remaining', authenticate, function (req, res) {
    res.json({user_info: "It works yeah"});
});


module.exports = router;
