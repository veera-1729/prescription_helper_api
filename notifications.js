const admin = require("firebase-admin");

// initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "gs://prescriptionhelper-be566.appspot.com"
});

// create a reference to the Firebase Cloud Messaging service
const messaging = admin.messaging();

const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   token: String
// });

// const User = mongoose.model("User", userSchema);

mongoose.connect(process.env.mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB");
});

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/send-notification", async (req, res) => {
  try {
    const { name, title, body } = req.body;

    // find the user by name in the database
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // send the notification to the user's device
    const response = await messaging.send({
      notification: {
        title,
        body
      },
      token: user.token
    });

    console.log("Successfully sent notification:", response);

    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
