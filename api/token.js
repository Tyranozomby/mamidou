const jwt = require("jsonwebtoken");

/**
 * Indique si le jwt donné est valide
 *
 * @param token {string}
 * @return {boolean} Validité du jwt
 */
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

/**
 * Renvoie un token de connexion d'une durée de 7 jours (modifiable dans le fichier .env)
 *
 * @return {string}
 */
function getToken() {
    return jwt.sign({}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION}, null)
}

module.exports = {validToken, getToken}