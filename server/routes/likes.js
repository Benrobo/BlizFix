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

    if (action === "like") {
        try {
            // check if post is already liked by user

            let sql = "INSERT INTO reaction(post_id,user_id,user_role,action) VALUES($1,$2,$3,$4)";
            conn.query(sql, [postId, id, role, action], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json(Error(400, "Something went wrong when adding like"))
                }
                return res.json({ msg: "Posts liked succesful", status: 200 }).status(200)
            })
        } catch (e) {
            return res.status(500).json(Error(400, "Something went wrong"))
        }
    }
    else if (action === "unlike") {
        try {
            let sql = "DELETE FROM reaction WHERE user_id=$1 AND post_id=$2";
            conn.query(sql, [id, postId], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json(Error(400, "Something went wrong when DELETING like"))
                }
                if (result.rowCount === 0) {
                    return res.json({ msg: "post notfound", status: 404 }).status(404)
                }
                console.log(err)
                return res.json({ msg: "unlike succesful", status: 200 }).status(200)
            })
        } catch (e) {
            return res.status(500).json(Error(400, "Something went wrong"))
        }
    }
})

// get users likes
router.get("/getlikes/:userId", async (req, res) => {
    // let { id, role } = req.user;
    // let { postId, action } = req.body;
    let { userId } = req.params;

    // if(action === "like"){
    try {
        let sql = "SELECT * FROM reaction WHERE user_id=$1"
        conn.query(sql, [userId], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json(Error(400, "Something went wrong when getting like"))
            }
            if (result.rowCount === 0) {
                return res.json({ msg: "No reaction found with that user", status: 404 }).status(404)
            }
            console.log(err)
            return res.json({ count: result.rowCount, data: result.rows, status: 200 }).status(200)
        })
    } catch (e) {
        return res.status(500).json(Error(400, "Something went wrong"))
    }
})

// get posts likes
router.get("/getPostlikes/:postId", async (req, res) => {
    // let { id, role } = req.user;
    // let { postId, action } = req.body;
    let { postId } = req.params;

    // if(action === "like"){
    try {
        let sql = "SELECT * FROM reaction WHERE post_id=$1"
        conn.query(sql, [postId], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json(Error(400, "Something went wrong when getting like"))
            }
            if (result.rowCount === 0) {
                return res.json({ msg: "No reaction found for that posts or post does not exist", status: 404 }).status(404)
            }
            console.log(err)
            return res.json({ count: result.rowCount, data: result.rows, status: 200 }).status(200)
        })
    } catch (e) {
        return res.status(500).json(Error(400, "Something went wrong"))
    }
})

module.exports = router