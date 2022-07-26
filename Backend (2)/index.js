const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const historyRoute=require("./routes/history")
const passport = require("passport");
const authRoute = require("./routes/auth");
const itemRoute = require("./routes/item");
const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/lostFoundDB');
const app = express();
bodyParser = require('body-parser');

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({ name: "session", keys: ["key"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.get('/',(req, res) => {
  res.send("Deployed Backend Website")
})






app.use("/auth", authRoute);
app.use("/items",itemRoute);
app.use('/history',historyRoute);






app.listen(5000, () => {
  console.log("Server is running! on Port ");
});
