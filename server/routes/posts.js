const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {v4: uuid} = require("uuid")

const {conn} = require("../models/User")

router.get("/register", (req, res)=>{
    let userId = uuid();
    let {name, email, pwd} = req.body;
    let hashPwd = bcrypt.hashSync(pwd, 10);
    let sql = "INSERT INTO users(id,name,email,hash) VALUES($1,$2,$3,$4)";
    conn.query(sql, [userId,name,email,hashPwd], (err, data)=>{
        if(err){
            
        }

        console.log(data.rowCount)
    })
})


module.exports = router