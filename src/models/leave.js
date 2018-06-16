var mongoose = require('mongoose');

//vehicle schema
var LeaveSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    date: {
        type: String
    },
    date_moment: {
        type: String
    },
    type:{
        type: String
    },
    reason:{
        type: String
    },
    approved:{
        type: Number,
        default: 0
    },
    confirmed:{
        type: Number,
        default: 0
    },
    timestamp:{
        type: String
    }
});

var Leave = module.exports = mongoose.model('Leave', LeaveSchema);

module.exports.createLeave = function (newLeave, callback) {
    newLeave.save(callback);
}

module.exports.getLeaveByUsername = function(username, callback){
	var query = {username: username};
	Leave.find(query, callback).sort({_id: -1}).limit(20);
}