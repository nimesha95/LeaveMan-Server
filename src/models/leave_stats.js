var mongoose = require('mongoose');

//vehicle schema
var LeaveStatsSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    remaining_leave: {
        type: Object,
        default: {
            "sick": 10,
            "paid": 20,
            "half": 10
          } 
    },
    history:{
        type: Object,
        default: {}
    }
});

var LeaveStats = module.exports = mongoose.model('LeaveStats', LeaveStatsSchema);

module.exports.createLeaveStat = function (newLeaveStat, callback) {
    newLeaveStat.save(callback);
}

module.exports.getLeaveByUsername = function(username, callback){
	var query = {username: username};
	LeaveStats.findOne(query, callback);
}
