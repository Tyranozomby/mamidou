const {getToken, validToken} = require("./token.js")

/**
 * Renvoie un token si le mot de passe est valide
 *
 * @param req {e.Request}
 * @param res {e.Response}
 */
function login(req, res) {
    if (!req.body.password)
        return res.status(400).end()

    const password = req.body.password

    if (password === process.env.PASSWORD) {
        const token = getToken()
        return res.status(200).json(token)
    } else {
        return res.status(401).end()
    }
}

/**
 * Renvoie un nouveau token si celui actuel est valide
 *
 * @param req {e.Request}
 * @param res {e.Response}
 */
function refreshToken(req, res) {
    if (!validToken(req.headers["x-access-token"]))
        return res.status(403).end()

    const token = getToken()
    return res.status(200).json(token)
}

module.exports = {login, refreshToken}