const jwt = require("jsonwebtoken");
const Error = require("../utils/error")

function verifyToken(req, res, next) {
    let bearer = req.headers["authorization"];

    if (bearer) {
        let token = bearer.split(" ")[1];
        // verify token
        jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json(Error(400, err.message))
            }

            req.user = user;
            next()
        })
    }
    else {
        return res.status(403).json(Error(400, "No token sent from headers"))
        next()
    }
}

function checkUserRole(req, res, next) {
    let {role} = req.user;

    if(role === 1 || role === 2){
        next()
    }else{
        return res.status(403).json(Error(400, "Not authorize"))
    }
}


module.exports = { verifyToken, checkUserRole }