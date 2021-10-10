const express = require("express");
const router = express.Router()
const Error = require("../utils/error")

const conn = require("../models/Model")


router.get("/getPosts", (req, res) => {
    let sql = "SELECT * FROM posts";
    conn.query(sql, (err, result)=>{
        if(err){
            console.log(err)
            return res.status(500).json(Error(400, "Something went wrong when adding posts"))
        }
        return res.json({posts: result.rows}).status(200)
    })
})

module.exports = router