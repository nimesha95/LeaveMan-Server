import jwt from 'jsonwebtoken';
import config from '../config';

var User = require('../models/user');

export default (req,res,next) => {
    const authorizationHeader = req.headers['authorization'];
    let token;

    if(authorizationHeader){
        token = authorizationHeader.split(' ')[1];
    }

    if(token){
        jwt.verify(token,config.jwtSecret,(err,decoded) =>{
            if(err){
                res.status(401).json({error: 'Failed to authenticate'});
            }
            else{
                User.getUserById(decoded.id, function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.status(400).json({error: "No such user"});
                    }
                    else{
                        req.currentUser = {username: user.username, _id: user._id};                    
                        next();
                    }
                });
            }
        })
    }
    else{
        res.status(403).json({
            error: "No token provided"
        })
    }
}