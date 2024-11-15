require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/user");
const cookiesRoute = require("./routes/cookies");
const roomRoute = require("./routes/room");
const bookingRoute = require("./routes/booking");
const careerRoute = require("./routes/career");
const uploadRoute = require("./routes/upload");
const jobApplication = require('./routes/jobapplication')

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user table all commmand
app.use("/user", userRoute);
// get data from cookies
app.use("/cookies", cookiesRoute);
// get room data
app.use("/room", roomRoute);
// get booking data
app.use("/booking", bookingRoute);
// get career data
app.use("/careers", careerRoute);
// upload
app.use("/upload", uploadRoute);
// get application data
app.use("/job", jobApplication);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
