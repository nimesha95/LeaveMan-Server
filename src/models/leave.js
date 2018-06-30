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

module.exports.getLeaveByUsername = function(username ,callback){
	var query = {username: username};
	Leave.find(query, callback).sort({_id: -1}).limit(20);
}

module.exports.getLeaveByID = function(id ,callback){
	var query = {_id: id};
	Leave.findOne(query, callback);
}

module.exports.getToApprovedLeaves = function(callback){
	var query = {approved: 0 , confirmed: 0};
	Leave.find(query, callback);
}

module.exports.ApproveLeave = function(id ,callback){
    var constraint = { _id: id};
    var query = { $set: { approved: 1 } };
    Leave.update(constraint , query,callback);
}

module.exports.DeclineLeave = function(id ,callback){
    var constraint = { _id: id};
    var query = { $set: { approved: -1 } };
    Leave.update(constraint , query,callback);
}