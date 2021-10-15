const express = require("express");
const router = express.Router()
const bcrypt = require("bcryptjs")
const { uploadFile } = require("../utils/fileUpload")
const { verifyToken } = require("../auth/auth")
const Error = require("../utils/error")

const conn = require("../models/Model")

router.post("/editUser", verifyToken, async (req, res) => {
    let { id } = req.user;
    let { username, email, profession, password } = req.body
    let hashedPwd = await bcrypt.hash(password, 10)
    let sql = "UPDATE users SET username=$1, email=$2, profession=$3,pwd_hash=$4 WHERE id=$5";
    conn.query(sql, [username, email, profession, hashedPwd, id], (err, result) => {
        if (err) {
            console.log(err)
            return res.json(Error(500, "Something went wrong")).status(500)
        }

        return res.json({ status: 200, msg: "Profile updated" }).status(200)
    })
})


module.exports = router