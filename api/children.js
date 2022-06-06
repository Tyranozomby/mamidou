const fs = require("fs");

const {validToken} = require("./token")
const {deleteData} = require("./functions")

/**
 * Chemin de stockage des données sur les enfants
 * @type {string}
 */
const CHILDREN_FILE = "data/children.json";

/**
 * Renvoie la liste des enfants
 *
 * @param req {e.Request}
 * @param res {e.Response}
 */
function getAll(req, res) {
    fs.readFile(CHILDREN_FILE, 'utf8', function (err, data) {
        return res.send(data);
    });
}

/**
 * Renvoie l'enfant demandé
 *
 * @param req {e.Request}
 * @param res {e.Response}
 */
function getChild(req, res) {
    const child = req.params.child;

    fs.readFile(CHILDREN_FILE, 'utf8', function (err, data) {
        const json = JSON.parse(data);
        return res.json(json[child]);
    });
}

/**
 * Change la couleur d'un enfant
 *
 * @param req {e.Request}
 * @param res {e.Response}
 */
function setChildColor(req, res) {
    if (!validToken(req.headers["x-access-token"]))
        return res.status(403).end()

    const child = req.params.child;
    const newColor = req.body.color;

    fs.readFile(CHILDREN_FILE, 'utf8', function (err, data) {
        const json = JSON.parse(data)

        if (json[child] && newColor)
            json[child].color = newColor;

        const txt = JSON.stringify(json, null, 2);
        fs.writeFile(CHILDREN_FILE, txt, (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.send(txt);
            }
        })
    });
}

/**
 * Ajoute un enfant à la liste
 *
 * @param req {e.Request}
 * @param res {e.Response}
 */
function addChild(req, res) {
    if (!validToken(req.headers["x-access-token"]))
        return res.status(403).end()

    if (req.params.child.trim() === "")
        return res.status(400).end()

    const child = req.params.child.trim().charAt(0).toUpperCase() + req.params.child.trim().toLowerCase().slice(1);

    if (!req.body.date)
        req.body.date = "01/01/2022"
    if (!req.body.color)
        req.body.color = "#123456"

    const val = {"date": req.body.date, "color": req.body.color};

    fs.readFile(CHILDREN_FILE, 'utf8', function (err, data) {
        let json = JSON.parse(data)

        json[child] = val;

        const txt = JSON.stringify(json, null, 2);
        fs.writeFile(CHILDREN_FILE, txt, (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.send(txt);
            }
        })
    });
}

/**
 * Supprime un enfant de la liste
 *
 * @param req {e.Request}
 * @param res {e.Response}
 */
function deleteChild(req, res) {
    if (!validToken(req.headers["x-access-token"]))
        return res.status(403).end()

    deleteData(req, res, CHILDREN_FILE)
}

module.exports = {getAll, getChild, setChildColor, addChild, deleteChild}