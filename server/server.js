require("dotenv").config()
const express = require("express")
const fileUpload = require('express-fileupload');
const cors = require("cors")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session")

const app = express()

// middlewares
app.use(fileUpload());
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ urlencoded: true, extended: false }));
app.use(session({ secret: 'secrete', saveUninitialized: true, resave: true }));

// route middleware
// AUTH
app.use("/auth/", require("./routes/register"))
app.use("/auth/", require("./routes/login"))
app.use("/auth/", require("./routes/logout"))
// POST 
app.use("/api/post/", require("./routes/addPost"))
app.use("/api/post/", require("./routes/getPosts"))
app.use("/api/post/", require("./routes/editPost"))
app.use("/api/post/", require("./routes/deletePost"))
app.use("/api/file/", require("./routes/fileUpload"))
// USER
app.use("/api/user/", require("./routes/getUsers"))
app.use("/api/user/", require("./routes/editUser"))

const port = 5000;
app.listen(port)