const fs = require("fs");

const {validToken} = require("./token")
const {deleteData} = require("./functions")

const CHILDREN_FILE = __dirname + "/../data/children.json";

function getAll(req, res) {
    fs.readFile(CHILDREN_FILE, 'utf8', function (err, data) {
        return res.send(data);
    });
}

function getChild(req, res) {
    const child = req.params.child;

    fs.readFile(CHILDREN_FILE, 'utf8', function (err, data) {
        const json = JSON.parse(data);

        const txt = JSON.stringify(json[child], null, 2);
        return res.send(txt);
    });
}

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

function addChild(req, res) {
    if (!validToken(req.headers["x-access-token"]))
        return res.status(403).end()

    if (req.params.child.trim() === "")
        return res.status(400).end()

    const child = req.params.child.trim();

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

function deleteChild(req, res) {
    if (!validToken(req.headers["x-access-token"]))
        return res.status(403).end()

    deleteData(req, res, CHILDREN_FILE)
}

module.exports = {getAll, getChild, setChildColor, addChild, deleteChild}