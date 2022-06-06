const fs = require("fs");

const {validToken} = require("./token")
const {deleteData, dataSort} = require("./functions")

/**
 * Chemin de stockage du fichier des données
 * @type {string}
 */
const DATA_FILE = "data/data.json";

/**
 * Renvoie la liste des données
 *
 * @param req {e.Request}
 * @param res {e.Response}
 */
function getAll(req, res) {
    fs.readFile(DATA_FILE, 'utf8', function (err, data) {
        res.send(data);
    });
}

/**
 * Renvoie les données d'un enfant précis
 *
 * @param req {e.Request}
 * @param res {e.Response}
 */
function getData(req, res) {
    const child = req.params.child;

    fs.readFile(DATA_FILE, 'utf8', function (err, data) {
        const json = JSON.parse(data);

        const txt = JSON.stringify(json[child], null, 2);
        res.send(txt);
    });
}

/**
 * Ajoute une donnée à un enfant
 *
 * @param req {e.Request}
 * @param res {e.Response}
 */
function addData(req, res) {
    if (!validToken(req.headers["x-access-token"]))
        return res.status(403).end()

    const child = req.params.child;

    if (!req.body.date)
        req.body.date = "01/01/2022"

    if (!req.body.value)
        req.body.value = 0
    else if (!Number.isNaN(req.body.value))
        req.body.value = Number(req.body.value)
    else
        req.body.value = 0


    const val = {"date": req.body.date, "value": req.body.value};

    fs.readFile(DATA_FILE, 'utf8', function (err, data) {
        let json = JSON.parse(data)

        if (!json[child])
            json[child] = [];

        json[child].push(val);
        json[child].sort(dataSort)
        return writeAndSend(json, res)
    });
}

/**
 * Modifie une donnée d'un enfant
 *
 * @param req {e.Request}
 * @param res {e.Response}
 */
function editData(req, res) {
    if (!validToken(req.headers["x-access-token"]))
        return res.status(403).end()

    const child = req.params.child;
    const date = req.params.date.replace(/-/g, "/");

    if (!req.body.value)
        req.body.value = 0
    else if (!Number.isNaN(req.body.value))
        req.body.value = Number(req.body.value)
    else
        req.body.value = 0

    const newVal = req.body.value;

    fs.readFile(DATA_FILE, 'utf8', function (err, data) {
        let json = JSON.parse(data)
        if (json[child] && newVal)
            for (let i = 0; i < json[child].length; i++)
                if (json[child][i].date === date)
                    json[child][i].value = newVal;

        json[child].sort(dataSort)
        return writeAndSend(json, res)
    });
}

/**
 * Supprime toutes les données d'un enfant
 *
 * @param req {e.Request}
 * @param res {e.Response}
 */
function deleteAllDataOf(req, res) {
    if (!validToken(req.headers["x-access-token"]))
        return res.status(403).end()

    deleteData(req, res, DATA_FILE)
}

/**
 * Supprime une donnée d'un enfant
 *
 * @param req {e.Request}
 * @param res {e.Response}
 */
function deleteDataOf(req, res) {
    if (!validToken(req.headers["x-access-token"]))
        return res.status(403).end()

    const child = req.params.child;
    const position = req.params.position;

    fs.readFile(DATA_FILE, 'utf8', function (err, data) {
        let json = JSON.parse(data)

        if (json[child])
            json[child].splice(position, 1);

        if (json[child].length === 0)
            delete json[child]

        const txt = JSON.stringify(json, null, 2);
        fs.writeFile(DATA_FILE, txt, (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.send(txt);
            }
        })
    });
}

// ----- FONCTION -----

/**
 * Enregistre les nouvelles données et renvoie la réponse
 *
 * @param json {Object}
 * @param res {e.Response}
 */
function writeAndSend(json, res) {
    const txt = JSON.stringify(json, null, 2);
    fs.writeFile(DATA_FILE, txt, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            return res.send(txt);
        }
    })
}

module.exports = {getAll, getData, editData, addData, deleteAllDataOf, deleteDataOf}