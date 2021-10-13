const express = require("express");
const router = express.Router()
const { uploadFile } = require("../utils/fileUpload")
const { verifyToken } = require("../auth/auth")
const Error = require("../utils/error")

const { conn } = require("../models/Model")

router.post("/upload", verifyToken, (req, res) => {
    let { id } = req.user;

    // update user img in db
    // console.log(req.user);
    // return;
    const file = req.files.file;
    const fileName = req.files.file.name
    let data = uploadFile(file, fileName);
    let sql = "UPDATE TABLE user SET user_img=$1 WHERE id = $2";
    conn.query(sql, [data.newfilename, id], (err, result) => {
        if (err) {
            return res.json(Error(500, "Something went wrong"))
        }

        return res.json({ status: 200, fileData: data })
    })
})


module.exports = router