const LocalStrategy = require("passport-local").Strategy;
const { conn } = require("../models/User");
const { compareHash } = require("../utils/compareHash")



module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        let sql = "SELECT * FROM users WHERE email = $1";
        conn.query(sql, [email], (err, data) => {
            if (err) {
                return done(null, err);
            }
            else if (data.rowCount === 0) {
                return done(null, false, { msg: "User with that email isnt register" })
            }
            else if (data.rowCount > 0) {
                let hashed = data.rows.hash;
                let check = compareHash(password, hashed);

                if (check === false) {
                    return done(null, false, { msg: "Password is incorrect" })
                }
                return done(null, data.rows)
            }
        })
    }))

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))
}

