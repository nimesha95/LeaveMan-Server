var express = require('express');
import authenticate from "../middlewares/authenticate";

var router = express.Router();

router.post('/', authenticate, function (req, res) {
    res.json(req.headers['authorization']);
});

router.post('/get_remaining', authenticate, function (req, res) {
    res.json({user_info: "It works"});
});


module.exports = router;
