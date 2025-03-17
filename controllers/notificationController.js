import Notification from "../models/Notification.js";

// Get user notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });

    if (!notification) return res.status(404).json({ message: "Notification not found" });

    res.json({ message: "Notification marked as read", notification });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
