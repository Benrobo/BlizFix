const express = require("express");
const router = express.Router()
const { v4: uuid } = require("uuid")
const Error = require("../utils/error")

const conn = require("../models/Model")

const { verifyToken } = require("../auth/auth");

router.post("/editPost", verifyToken, (req, res) => {
    let { id, role } = req.user;
    let { postId, title, slug, description, image } = req.body;
    if (image === "") {
        return res.status(403).json({ msg: "Image is missing", status: 404 })
    }
    try {
        let sql = "UPDATE posts SET title=$1,image_url=$2,slug=$3,description=$4 WHERE posts.id=$5 AND posts.user_id=$6"
        conn.query(sql, [title, image, slug, description, postId, id], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json(Error(400, "Something went wrong when adding posts"))
            }

            console.log(result)

            return res.json({ msg: "Post updated sucessfully", status: 200 }).status(200)
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: "Something went wrong uploading image", status: 500 })
    }
})



module.exports = router