const express = require("express");
const router = express.Router()
const { v4: uuid } = require("uuid")
const Error = require("../utils/error")

const conn = require("../models/Model")



const { verifyToken } = require("../auth/auth");


router.post("/add", verifyToken, (req, res) => {
    let postId = uuid();
    let {id, role} = req.user;
    let likes = 0;
    let dislikes = 0;
    let views = 0;
    let {title, body, solution,image} = req.body;
    let sql = "INSERT INTO posts(id,title,img,user_id,likes,dislikes,body,views,solution,user_role) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
    conn.query(sql, [postId,title,image,id,likes,dislikes,body,views,solution,role], (err, result)=>{
        if(err){
            console.log(err)
            return res.status(500).json(Error(400, "Something went wrong when adding posts"))
        }

        return res.json("Post added sucessfully").status(200)
    })
})



module.exports = router