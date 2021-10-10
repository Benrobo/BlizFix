const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs")
const { conn } = require("../models/User");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            // check if user with emaIl already exist in db
            let sql = "SELECT * FROM users WHERE email = $1";
            conn.query(sql, [email], (err, data) => {
                if (err) {
                    return done(null, err);
                }
                console.log(data.rowCount)
                if (data.rowCount == 0) {
                    return done(null, false, { msg: "User with that email isnt register" })
                }
                if (data.rowCount > 0) {
                    let hashed = data.rows.hash;
                    let check = bcrypt.compareSync(password, hashed);

                    if (check === false) {
                        return done(null, false, { msg: "Password is incorrect" })
                    }

                    console.log(check)

                    return done(null, data.rows)
                }
            })

        })
    )

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        // find user by id
        console.log(id)
        let sql = "SELECT * FROM users WHERE id = $1";
        conn.query(sql, [id], (err, user) => {
            console.log(user)
            done(null, user)
        })
    });
}

