const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
dotenv.config();


// initialize Firebase Admin SDK

const bodyParser = require("body-parser");

const userRoutes = require("./routes/user");
const notificaionRoutes = require("./routes/notifications")
//middlewares
// app.use(cors())
// app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificaionRoutes);
const connect = async () => {
  try {
    await mongoose.connect(process.env.mongourl);
    console.log("Connected to mongoDB");
  } catch (e) {
    throw e;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

app.listen(8800, () => {
  connect();
  console.log("Serving on port 8800");
});