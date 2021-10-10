module.exports = (code, msg)=>{
    const error = new Error()
    error.status = code;
    error.msg = msg;
    return error;
}