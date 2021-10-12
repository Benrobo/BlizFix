const express = require("express");
const router = express.Router()
const { uploadFile } = require("../utils/fileUpload")

router.post("/upload", (req, res) => {
    const file = req.files.file;
    const fileName = req.files.file.name
    let path = uploadFile(file, fileName);
    res.json({ status: 200, filePath: path })
})


module.exports = router