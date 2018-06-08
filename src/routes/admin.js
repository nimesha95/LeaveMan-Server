var express = require('express');
import authenticate from "../middlewares/authenticate";

var router = express.Router();

router.post('/', authenticate, function (req, res) {
    res.json(req.headers['authorization']);
});

module.exports = router;
