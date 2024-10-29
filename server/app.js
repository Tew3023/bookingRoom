require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/user");
const cookiesRoute = require("./routes/cookies")
const roomRoute = require("./routes/room")
const bookingRoute = require("./routes/booking")

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
app.use("/cookies",cookiesRoute)
// get room data
app.use("/room",roomRoute)
// get booking data
app.use("/booking",bookingRoute)

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
