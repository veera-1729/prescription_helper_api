const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
dotenv.config();
const cors = require("cors");

// initialize Firebase Admin SDK

const bodyParser = require("body-parser");

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin")
const notificaionRoutes = require("./routes/notifications");
const medicineRoutes = require("./routes/medicines");
//middlewares
// app.use(cors())
// app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/notifications", notificaionRoutes);
// app.use("/", (req, res) => {
//   res.send("Hello from your api");
// });
const connect = async () => {
  try {
    await mongoose.connect(process.env.mongourl);
    console.log("Connected to mongoDB");
  } catch (e) {
    throw e;
  }
};

mongoose.connection.on("disconnected", (e) => {
  console.log("mongoDB disconnected ",e);
});

app.listen(8800, () => {
  connect();
  console.log("Serving on port 8800");
});
