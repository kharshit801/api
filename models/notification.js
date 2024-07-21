const mongoose = require('mongoose');
const {connectNotifications} = require("../dbConfig");
const notificationSchema = new mongoose.Schema({
    professorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true });

const getNotificationModel = async (department, semester) => {
    const connection = await connectNotifications;
    const collectionName = `${department}_${semester}_Notifications`;
    return connection.model(collectionName, notificationSchema);
};

module.exports = getNotificationModel;