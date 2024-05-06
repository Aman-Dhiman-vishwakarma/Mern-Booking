const { Notification } = require("../models/notification.model");

exports.getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({to: userId}).populate({
            path: "from",
            select: "username profileImg"
        })

        await Notification.updateMany({to:userId}, {read:true})
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({to:userId})
        res.status(200).json({messege:"notification deleted successfully"});
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deletesingleNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user._id;
        const notification = await Notification.findById(notificationId)

        if(!notification){
           return  res.status(400).json({messege:"notification is not found"});
        }

        if(notification.to.toString() !== userId.toString()){
            return  res.status(400).json({messege:"you are not allowed to delete this notification"});
        }
        await Notification.findByIdAndDelete(notificationId)
        res.status(200).json({messege:"notification deleted successfully"});
    } catch (error) {
        res.status(500).json(error);
    }
}