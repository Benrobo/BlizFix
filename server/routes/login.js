const express = require("express");
const router = express.Router()
const bcrypt = require("bcryptjs")
const { v4: uuid } = require("uuid")
const Error = require("../utils/error")
const compareHash = require("../utils/compareHash")
const { createAccessToken, createRefreshToken, setRefreshToken, sendTokens } = require("../auth/tokens")

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

            if (!check) {
                return res.json(Error(400, "Password given is incorrect")).status(400)
            } else {
                let newsql = "SELECT * FROM users WHERE email=$1";
                conn.query(newsql, [email], async (err, data) => {
                    if (err) {
                        console.log(err)
                        return res.json(Error(500, "Something went wrong")).status(500)
                    }

                    let userDbData = {
                        id: data.rows[0].id,
                        role: data.rows[0].user_role
                    }
                    try {
                        let accessToken = createAccessToken(userDbData)
                        let refreshToken = createRefreshToken(userDbData)
                        // add refrestoken to db
                        let sql = "UPDATE users SET refresh_token = $1 WHERE email = $2";

                        let chk = await conn.query(sql, [refreshToken, email]);

                        if (chk.rowCount > 0) {
                            sendTokens(res, accessToken, refreshToken);
                            setRefreshToken(res, refreshToken)
                        }

                        return;
                        conn.query(sql, [refreshToken, email], (err, result) => {
                            if (err) {
                                // console.log(err)
                                return res.send({ msg: "Something went wrong" })
                            }

                            // res.json({ msg: "Logged In", status: 200, error: false, refreshToken })
                            // return;
                        })
                        sendRefreshToken(res, refreshToken)
                        // sendAccessToken(res, accessToken)
                        // res.clearCookie("refresh_token")
                    } catch (err) {
                        return res.json(Error(500, "Something went wrong")).status(500)
                    }
                    console.log(req.cookies)
                    // sendAccessToken(res, accessToken, userDbData)
                })
            }
        }
    })


})

module.exports = router