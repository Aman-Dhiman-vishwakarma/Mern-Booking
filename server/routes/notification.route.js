const express = require('express');
const { protectRoute } = require('../middlewere/protectRoute');
const { getNotifications, deleteNotifications, deletesingleNotification } = require('../controllers/notification.controller');
const notificationroute = express.Router();

notificationroute.get("/", protectRoute, getNotifications)
.delete("/", protectRoute, deleteNotifications)
.delete("/:id", protectRoute, deletesingleNotification)

exports.notificationroute = notificationroute;