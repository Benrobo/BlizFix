const jwt = require("jsonwebtoken")


function createAccessToken(user){
    let token = jwt.sign({user}, process.env.JWT_ACCESS_TOKEN_SECRET,{expiresIn: "7d" });
    return token;
}

function createRefreshToken(user) {
    let token = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET);
    return token;
}

function sendRefreshToken(res, refreshToken) {
    if (refreshToken) {
        res.cookie("refresh_token", refreshToken)
    } else {
        res.json("something happended, refreshToken is mmissing")
    }
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken
}