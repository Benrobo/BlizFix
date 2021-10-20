const express = require("express");
const { cloudinary } = require("../config/cloudinary")
const router = express.Router()
const { v4: uuid } = require("uuid")
const Error = require("../utils/error")

const conn = require("../models/Model")

const { verifyToken } = require("../auth/auth");

/**
When a user like a particular idea, a request is sent to server containing the information
    data {
        user_id,
        post_id,
        action (Like/Unlike)
    } 
we then make use of this data to query our psql database
*/
router.post("/like", verifyToken, async (req, res) => {
    let { id, role } = req.user;
    let { postId, action } = req.body;
    let likeCount = 1;

    // check if reaction table has a user id and post id on it, if it does, it means user has liked posts so just remove the user from the table which is unlike, and vice versa
    try {
        let sql1 = "SELECT * FROM reaction WHERE user_id=$1 AND post_id=$2";
        conn.query(sql1, [id, postId], (err, result) => {
            if (err) {
                return res.status(500).json(Error(400, "Something went wrong"))
            }
            console.log(result.rowCount)
            if (result.rowCount === 0) {
                // this means user has'nt like post
                // then just add user data to reaction table
                try {
                    let sql2 = "INSERT INTO reaction(post_id,user_id,user_role,action,count) VALUES($1,$2,$3,$4,$5)";
                    conn.query(sql2, [postId, id, role, action, likeCount], (err, result) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json(Error(400, "Something went wrong when adding like"))
                        }
                        return res.json({ count: result.rows.length, data: result.rows, status: 200 }).status(200)
                    })
                } catch (e) {
                    return res.status(500).json(Error(400, "Something went wrong"))
                }
            }
            else if (result.rowCount > 0) {
                // IF this is true, this means that user already like post so we just delete the, from the table
                try {
                    let sql2 = "DELETE FROM reaction WHERE post_id=$1 AND user_id=$2";
                    conn.query(sql2, [postId, id], (err, result) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json(Error(400, "Something went wrong when deleting like"))
                        }
                        return res.json({ count: result.rows.length, data: result.rows, msg: "unlike successful", status: 200 }).status(200)
                    })
                } catch (e) {
                    return res.status(500).json(Error(400, "Something went wrong"))
                }
            }
        })
    } catch (e) {
        return res.status(500).json(Error(400, "Something went wrong"))
    }
})

// get users likes
router.get("/getlikes/:userId", async (req, res) => {
    let { userId } = req.params;

    try {
        let sql = "SELECT * FROM reaction WHERE user_id=$1"
        conn.query(sql, [userId], (err, result) => {
            if (err) {
                return res.status(500).json(Error(400, "Something went wrong when getting like"))
            }
            if (result.rowCount === 0) {
                return res.json({ data: result.rows, status: 404 }).status(404)
            }
            return res.json({ count: result.rows.length, data: result.rows, status: 200 }).status(200)
        })
    } catch (e) {
        return res.status(500).json(Error(400, "Something went wrong"))
    }
})

// get posts likes
router.get("/getPostlikes/:postId", async (req, res) => {
    let { postId } = req.params;

    try {
        let sql = "SELECT * FROM reaction WHERE post_id=$1"
        conn.query(sql, [postId], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json(Error(400, "Something went wrong when getting like"))
            }
            return res.json({ count: result.rowCount, data: result.rows, status: 200 }).status(200)
        })
    } catch (e) {
        return res.status(500).json(Error(400, "Something went wrong"))
    }
})

module.exports = router