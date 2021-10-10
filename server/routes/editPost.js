const express = require("express");
const router = express.Router()
const { v4: uuid } = require("uuid")
const Error = require("../utils/error")

const conn = require("../models/Model")

const { verifyToken } = require("../auth/auth");

router.post("/editPost", verifyToken, (req, res) => {
    let { id } = req.user;
    let { postId, title, image, body, solution } = req.body;
    // get post with that id
    let sql = "SELECT * FROM posts WHERE id = $1";
    conn.query(sql, [postId], (err, results) => {
        if (err) {
            return res.json(Error(500, "Something went wrong when editing post")).status(500);
        }
        else if (results.rowCount === 0) {
            return res.status(404).json(Error(400, "No post found"));
        }
        else if (results.rowCount > 0) {
            let editSql = `UPDATE posts SET title=$1, user_id=$2, body=$3, img=$4, solution=$5`;
            conn.query(editSql, [title, id, body, image, solution], (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json(Error(400, "Something went wrong when adding posts"))
                }

                return res.json("Post updated sucessfully").status(200)
            })
        }
    })
})



module.exports = router