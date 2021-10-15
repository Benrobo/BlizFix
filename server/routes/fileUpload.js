const express = require("express");
const router = express.Router()
const { uploadFile } = require("../utils/fileUpload")
const { verifyToken } = require("../auth/auth")
const Error = require("../utils/error")

const conn = require("../models/Model")

router.post("/upload", verifyToken, (req, res) => {
    let { id } = req.user;
    let { image } = req.body
    let sql = "UPDATE users SET user_img=$1 WHERE id = $2";
    conn.query(sql, [image, id], (err, result) => {
        if (err) {
            console.log(err)
            return res.json(Error(500, "Something went wrong"))
        }

        return res.json({ status: 200, msg: "Profile pic updated" })
    })
})


module.exports = router