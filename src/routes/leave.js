var express = require('express');
import authenticate from "../middlewares/authenticate";

var router = express.Router();

router.post('/', authenticate, function (req, res) {
    console.log("something--> "+ JSON.stringify(req.body));
    res.status(201).json({user_info: req.currentUser});
});

module.exports = router;
