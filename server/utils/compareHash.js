const bcrypt = require("bcryptjs");

const compareHash = async (password, hash) => {
    let compare = await bcrypt.compare(password, hash)
    return compare;
}

module.exports = compareHash