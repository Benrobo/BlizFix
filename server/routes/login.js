const express = require("express");
const router = express.Router()
const bcrypt = require("bcryptjs")
const { v4: uuid } = require("uuid")
const Error = require("../utils/error")
const compareHash = require("../utils/compareHash")
const { createAccessToken, createRefreshToken, sendRefreshToken } = require("../auth/tokens")

const conn = require("../models/Model")


router.post("/login", (req, res) => {
    let { password, email } = req.body;

    let sql = "SELECT * FROM users WHERE email=$1";
    conn.query(sql, [email], async (err, data) => {
        if (err) {
            console.log(err)
            return res.json(Error(500, "Something went wrong")).status(500)
        }
        else if (data.rowCount === 0) {
            return res.json(Error(401, "User with that email not found")).status(401)
        }
        else {

            let hash = data.rows[0].pwd_hash;
            let check = await compareHash(password, hash)
            console.log(check)

            if (!check) {
                return res.json(Error(400, "Password given is incorrect")).status(400)
            } else {
                let newsql = "SELECT * FROM users WHERE email=$1";
                conn.query(newsql, [email], (err, data) => {
                    if (err) {
                        console.log(err)
                        return res.json(Error(500, "Something went wrong")).status(500)
                    }

                    let userDbData = {
                        id: data.rows[0].id,
                        role: data.rows[0].user_role
                    }
                    let accessToken = createAccessToken(userDbData)
                    let refreshToken = createRefreshToken(userDbData)
                    // add refrestoken to db
                    let sql = "UPDATE users SET refresh_token = $1 WHERE email = $2";
                    conn.query(sql, [refreshToken, email], (err, result) => {
                        if (err) {
                            console.log(err)
                            return res.send({ msg: "Something went wrong" })
                        }
                        res.json({ msg: "logged in", refreshToken })
                    })
                    sendRefreshToken(res, refreshToken)
                    console.log(req.cookies)
                    // sendAccessToken(res, accessToken, userDbData)
                })
            }
        }
    })


})

module.exports = router