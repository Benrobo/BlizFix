require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session")
// const passport = require("passport")

const app = express()

// passportjs config
// require("./config/passport")(passport)

// middlewares
// app.use(passport.initialize());
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ urlencoded: true, extended: false }));
app.use(session({ secret: 'secrete', saveUninitialized: true, resave: true }));
// app.use(passport.session());

// route middleware
app.use("/auth/", require("./routes/register"))
app.use("/auth/", require("./routes/login"))
app.use("/api/post/", require("./routes/addPost"))
app.use("/api/post/", require("./routes/getPosts"))
app.use("/api/post/", require("./routes/editPost"))
app.use("/api/post/", require("./routes/deletePost"))


const port = 5000;
app.listen(port)