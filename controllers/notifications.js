const user_Collection = require("../models/user");
const admin = require("firebase-admin");
const fcm = require("fcm-notification");
const cron = require("node-cron")
var serviceAccount = require("../config/push-notifications-key.json");
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "gs://prescriptionhelper-be566.appspot.com",
});
const push_notifications = async (req, res) => {
  try {
    

    const messaging = admin.messaging();

    // const user = await user_Collection.findOne({ _id: req.params.userId });
    const user = await user_Collection.findOne({ _id: "63fda0c55de8223aeabd0552" });

    if (!user) {
      //return res.status(404).json({ error: "User not found" });
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
       // return res.status(500).send({ message: err });
      } else {
       // return res.status(200).send({ message: "Notification sent" });
       console.log("MEssage sent succesfully")
      }
    });


  } catch (error) {
    console.error("Error sending notification:", error);
    //res.status(500).json({ error: "Failed to send notification" });
  }
};

// cron.schedule("*/1 * * * * *" ,() => {
//   console.log("Started ")
//   push_notifications()
// })

module.exports = { push_notifications };
