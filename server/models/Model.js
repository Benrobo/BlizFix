const { Pool } = require("pg")

const conn = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT,
})

conn.connect((err)=>{
    if(err){
        console.log(err)
        return;
    }

    console.log("connected")
})

module.exports = conn;
