const path = require("path")
const { v4: uuid } = require("uuid")

function uploadFile(file, filename) {
    let id = uuid()
    let randFileName = id.slice(0, 7)
    let extractFileName = filename.split(".")[0];
    let fileExt = filename.split(".")[1];
    let newfilename = `${extractFileName.replace(extractFileName, randFileName)}.${fileExt}`;

    let uploadPath = path.join(__dirname + `../../../client/public/uploads/${newfilename}`)

    try {
        file.mv(uploadPath, (err) => {
            if (err) {
                return { msg: "Something went wrong when uploading file", status: 500 };
            }
        })
    } catch (err) {
        return { msg: "Something went wrong", status: 500 };
    }

    return { uploadPath, newfilename };
}

module.exports = { uploadFile }