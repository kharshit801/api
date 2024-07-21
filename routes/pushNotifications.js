const express = require("express");
const router = express.Router();
const getNotificationModel = require("../models/notification");


// Updated GET route to fetch notifications for a specific professor, department, and semester
router.get("/:professorId/:department/:semester", async (req, res) => {
  try {
    const { professorId, department, semester } = req.params;
    const NotificationModel = await getNotificationModel(department, semester);
    const notifications = await NotificationModel.find({ professorId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications", error: err.message });
  }
});

// Updated POST route to include professorId
router.post("/", async (req, res) => {
  try {
    const { professorId, title, message, Date, time, department, semester } = req.body;
    console.log("Request received in pushNotification API");

    const NotificationModel = await getNotificationModel(department, semester);

    const notificationData = { professorId, title, message, Date, time };
    const result = await NotificationModel.create(notificationData);

    res
      .status(200)
      .json({ message: "Notification pushed successfully", data: result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to push notification", error: err.message });
  }
});

// New PUT route to update a notification
router.put("/:department/:semester/:id", async (req, res) => {
  try {
    const { department, semester, id } = req.params;
    const { message } = req.body;
    const NotificationModel = await getNotificationModel(department, semester);
    const updatedNotification = await NotificationModel.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );
    res.status(200).json(updatedNotification);
  } catch (err) {
    res.status(500).json({ message: "Failed to update notification", error: err.message });
  }
});

// New DELETE route to delete a notification
router.delete("/:department/:semester/:id", async (req, res) => {
  try {
    const { department, semester, id } = req.params;
    const NotificationModel = await getNotificationModel(department, semester);
    await NotificationModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete notification", error: err.message });
  }
});

module.exports = router;