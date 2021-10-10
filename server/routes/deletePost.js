const express = require("express");
const router = express.Router()
const { v4: uuid } = require("uuid")
const Error = require("../utils/error")

const conn = require("../models/Model")

const { verifyToken } = require("../auth/auth");

router.delete("/deletePost", verifyToken, (req, res) => {
    let { id } = req.user;
    let { postId } = req.body;
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
            let editSql = `DELETE FROM posts WHERE id=$1 AND user_id=$2`;
            conn.query(editSql, [postId, id], (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json(Error(400, "Something went wrong when deleting posts"))
                }

                return res.json("Post deleted sucessfully").status(200)
            })
        }
    })
})



module.exports = router