const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid")
const passport = require("passport")

const { conn } = require("../models/Model")
const { Message } = require("../utils/message")

router.get("/all", (req, res) => {
    conn.query("select * from users", (err, data) => {
        if (err) {
            console.log(err)
            Message("Something went wrong", res)
        }

        Message({ data: data.rows }, res)
    })
})

router.post("/register", (req, res) => {
    let userId = uuid();
    let { name, email, pwd } = req.body;
    let hashPwd = bcrypt.hashSync(pwd, 10);

    // check if user exist
    conn.query("SELECT * FROM users WHERE email = $1", [email], (err, data) => {
        if (err) {
            console.log(err)
            Message({ errorMsg: "Something went wrong" }, res)
        }
        else if (data.rowCount > 0) {
            Message({ errorMsg: "User withh that email already exist" }, res)
        } else {
            let sql = "INSERT INTO users(id,name,email,hash) VALUES($1,$2,$3,$4)";
            conn.query(sql, [userId, name, email, hashPwd], (err, data) => {
                if (err) {
                    // console.log(err)
                    Message({ errorMsg: "Something went wrong" }, res)
                }

                // console.log(data.rowCount)
                Message({ msg: "User inserted" }, res)
            })
        }
    })

})

router.post("/login", (req, res, next) => {
    passport.authenticate('local', function (err, user) {
        console.log(user)
        if (!user) { return res.json("no user was found"); }
        res.end('Authenticated!');
    })(req, res);
})



module.exports = router