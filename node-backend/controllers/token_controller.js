//Generate Token using secret from process.env.JWT_SECRET
var jwt = require("jsonwebtoken");
function generateToken(id, role) {
    //1. Dont use password and other sensitive fields
    //2. Use fields that are useful in other parts of the     
    //app/collections/models
    if (!id || !role) return null;

    var payload = {
        id: id,
        role: role
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}
function getCleanUser(user) {
    if (!user) return null;

    return {
        _id: user._id.toString(),
        username: user.username
    };
}
module.exports = { generateToken, getCleanUser }