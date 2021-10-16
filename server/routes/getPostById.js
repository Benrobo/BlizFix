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

router.get("/getPostById/:id", (req, res) => {
    let { id } = req.params
    console.log(id)
    // let sql = "SELECT posts.id,posts.user_id,users.id,users.username,user_img,posts.created_at,title,slug,description,image_url,image_id,likes,views FROM posts INNER JOIN users ON users.id=posts.user_id WHERE posts.user_id=$1 ORDER BY posts.created_at";
    let sql = "SELECT posts.id,posts.user_id,users.username,users.user_img,posts.created_at,title,slug,description,image_url,image_id,likes,views FROM posts INNER JOIN users ON posts.id=$1 WHERE posts.id=$2"
    conn.query(sql, [id, id], (err, result) => {
        // console.log(result.rowCount)
        if (err) {
            console.log(err)
            return res.status(500).json(Error(500, "Something went wrong when getting posts"))
        }
        else if (result.rowCount === 0) {
            return res.status(404).json(Error(404, "No Post Found with that user"))
        }
        return res.json({ posts: result.rows, status: 200 }).status(200)
    })
})

router.post("/getPostById", (req, res) => {
    let { id } = req.body;
    let sql = "SELECT posts.id,posts.user_id,users.username,users.user_img,posts.created_at,title,slug,description,image_url,image_id,likes,views FROM posts INNER JOIN users ON posts.id=$1 WHERE posts.id=$2";
    conn.query(sql, [id, id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json(Error(500, "Something went wrong when getting posts"))
        }
        else if (result.rowCount === 0) {
            return res.status(404).json(Error(404, "No Post Found with that user"))
        }
        return res.json({ posts: result.rows, status: 200 }).status(200)
    })
})

module.exports = router