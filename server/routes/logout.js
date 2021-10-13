const express = require("express");
const router = express.Router()

const { verifyToken } = require("../auth/auth")


router.post("/logout", verifyToken, (req, res) => {
    res.clearCookie("refresh_token");
    res.status(200).json({ status: 200, msg: "Logout successful" })
})

module.exports = router