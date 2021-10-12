const jwt = require("jsonwebtoken")


function createAccessToken(user) {
    let token = jwt.sign({ user }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
    return token;
}

function createRefreshToken(user) {
    let token = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
    return token;
}

function sendTokens(res, accessToken, refreshToken) {
    res.json({ accessToken, refreshToken, status: 200 }).status(200)
}

function setRefreshToken(res, refreshToken) {
    if (refreshToken) {
        res.cookie("refresh_token", refreshToken)
    } else {
        res.json("something happended, refreshToken is missing")
    }
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    setRefreshToken,
    sendTokens
}