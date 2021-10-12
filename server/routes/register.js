const express = require("express");
const router = express.Router()
const { v4: uuid } = require("uuid")
const Error = require("../utils/error")
const createHash = require("../utils/createHash")


const conn = require("../models/Model")

router.post("/register", (req, res) => {
    const userid = uuid();
    const role = 1;
    let user_img = "dumy-random-img.png"
    const { username, email, password, profession } = req.body;

    if (username === "" || email === "" || password === "" || profession === "") {
        return res.json(Error(400, "All fields are required")).status(400)
    }

    // check if user exist
    let sql = `SELECT * FROM users WHERE email=$1`;
    conn.query(sql, [email], async (err, data) => {
        if (err) {
            console.log(err)
            return res.json(Error(500, "All fields are required")).status(500)
        }
        else if (data.rowCount > 0) {
            return res.json(Error(401, "User with that email is already registered")).status(401)
        }
        else {
            try {
                let newPwd = await createHash(password, 10)
                let sql = `INSERT INTO users(id,username,email,pwd_hash,user_role,user_img,profession) VALUES($1,$2,$3,$4,$5,$6,$7)`;
                conn.query(sql, [userid, username, email, newPwd, role, user_img, profession], (err, data) => {
                    if (err) {
                        console.log(err)
                        return res.json(Error(500, "Somemthing went wrong")).status(500)
                    }

                    res.json({ msg: "User registered successfully", status: 200, error: false })
                })
            } catch (err) {
                return res.json(Error(400, err.message)).status(400)
            }
        }
    })

})


module.exports = router