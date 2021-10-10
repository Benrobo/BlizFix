const bcrypt = require("bcryptjs");

module.exports =  async function(str, salt){
    let hash = await bcrypt.hash(str, salt)
    return hash;
}
