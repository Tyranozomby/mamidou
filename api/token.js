const jwt = require("jsonwebtoken");

function validToken(token) {
    if (!token) {
        return false;
    }
    try {
        let tok = jwt.verify(token, process.env.JWT_SECRET, {}, null)
        return !!tok;
    } catch (e) {
        return false;
    }
}

function getToken() {
    return jwt.sign({}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION}, null)
}

module.exports = {validToken, getToken}