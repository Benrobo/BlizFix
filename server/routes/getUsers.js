const express = require("express");
const router = express.Router()
const Error = require("../utils/error")
const { verifyToken } = require("../auth/auth");
const conn = require("../models/Model")


router.post("/getUserById", (req, res) => {
    let { id } = req.body;
    // get user from db by id
    let sql = "SELECT * FROM users WHERE id=$1";
    conn.query(sql, [id], (err, result) => {
        if (err) {
            return Error(500, "Something went wrong")
        }
        if (result.rowCount === 0) {
            return res.json(Error(500, "Failed when getting user with id"))
        }
        let { username, email, user_img, profession } = result.rows[0]
        let clientData = {
            username,
            email,
            user_img,
            profession
        };

        return res.status(200).json({ status: 200, data: clientData })
    })
})

module.exports = router