const express = require("express");
const router = express.Router()
const Error = require("../utils/error")

const conn = require("../models/Model")


/*
  data we need from two tables
  - userid
  -userimage
  -postTitle
  -postSlug
  -postDescription
  -postLikes
  -postDislikes
  -postViews

*/

router.get("/getPosts", (req, res) => {
    let sql = "SELECT posts.id,users.id,user_img,posts.id,posts.created_at,title,slug,description,image_url,image_id,likes,views FROM posts INNER JOIN users ON users.id=posts.user_id ORDER BY posts.created_at";
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json(Error(400, "Something went wrong when getting posts"))
        }
        return res.json({ posts: result.rows, status: 200 }).status(200)
    })
})

module.exports = router