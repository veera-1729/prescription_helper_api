const user_Collection = require("../models/user");
const admin = require("firebase-admin");
const fcm = require("fcm-notification");

var serviceAccount = require("../config/push-notifications-key.json");
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);
const push_notifications = async (req, res) => {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: "gs://prescriptionhelper-be566.appspot.com",
    });

    const messaging = admin.messaging();

    const user = await user_Collection.findOne({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const name = user.username;
    const medicines = user.medicine_timings[0]["9"];
    let message = {
      notification: {
        title: "Test Notificaion",
        body: "Notification Message",
      },
      data: {
        name: user.username,
        image: medicines["img"],
        qty: medicines["qty"].toString(),
      },
      token: user.firebase_token,
    };

    FCM.send(message, (err, r) => {
      if (err) {
        return res.status(500).send({ message: err });
      } else {
        return res.status(200).send({ message: "Notification sent" });
      }
    });


  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
};

module.exports = { push_notifications };
