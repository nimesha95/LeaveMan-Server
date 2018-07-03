var mongoose = require('mongoose');

//vehicle schema
var NotificationSchema = mongoose.Schema({
    username: {
        type: String,
    },
    message: {
        type: String 
    },
    timestamp:{
        type: String,
    }
});

var Notifications = module.exports = mongoose.model('Notification', NotificationSchema);

module.exports.createNotification = function (newNotification, callback) {
    newNotification.save(callback);
}

module.exports.getNotificationsByUsername = function(username, callback){
	var query = {username: username};
	Notifications.find(query, callback);
}
