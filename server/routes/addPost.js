const express = require("express");
const { cloudinary } = require("../config/cloudinary")
const router = express.Router()
const { v4: uuid } = require("uuid")
const Error = require("../utils/error")

const conn = require("../models/Model")



const { verifyToken } = require("../auth/auth");

router.post("/add", verifyToken, async (req, res) => {
    let postId = uuid();
    let imageId = uuid();
    let { id, role } = req.user;
    let likes = 0;
    let dislikes = 0;
    let views = 0;
    let { title, slug, description, image } = req.body;
    try {
        let sql = "INSERT INTO posts(id,title,image_url,image_id,user_id,likes,dislikes,slug,views,description,user_role) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
        conn.query(sql, [postId, title, image, imageId, id, likes, dislikes, slug, views, description, role], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json(Error(400, "Something went wrong when adding posts"))
            }

            return res.json({ msg: "Post added sucessfully", status: 200 }).status(200)
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: "Something went wrong uploading image", status: 500 })
    }

    // console.log(req.body.slug, cldimg);
    // return;

})

// return;

// router.post("/add", verifyToken, async (req, res) => {
//     let postId = uuid();
//     let { id, role } = req.user;
//     let likes = 0;
//     let dislikes = 0;
//     let views = 0;
//     let { title, slug, description, image } = req.body;

//     try {
//         let response = await cloudinary.uploader.upload(image, {
//             upload_preset: "BLIZFIX"
//         });
//         let { asset_id, secure_url } = response;

//         let sql = "INSERT INTO posts(id,title,image_url,image_id,user_id,likes,dislikes,slug,views,description,user_role) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
//         conn.query(sql, [postId, title, secure_url, asset_id, id, likes, dislikes, slug, views, description, role], (err, result) => {
//             if (err) {
//                 console.log(err)
//                 return res.status(500).json(Error(400, "Something went wrong when adding posts"))
//             }

//             return res.json({ msg: "Post added sucessfully", status: 200 }).status(200)
//         })
//     } catch (e) {
//         console.log(e)
//         return res.status(500).json({ msg: "Something went wrong uploading image", status: 500 })
//     }

//     // console.log(req.body.slug, cldimg);
//     // return;

// })



module.exports = router