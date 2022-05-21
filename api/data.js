const fs = require("fs");

const {validToken} = require("./token")
const {deleteData, dataSort} = require("./functions")

const DATA_FILE = __dirname + "/../data/data.json";


function getAll(req, res) {
    fs.readFile(DATA_FILE, 'utf8', function (err, data) {
        res.send(data);
    });
}

function getData(req, res) {
    const child = req.params.child;

    fs.readFile(DATA_FILE, 'utf8', function (err, data) {
        const json = JSON.parse(data);

        const txt = JSON.stringify(json[child], null, 2);
        res.send(txt);
    });
}

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

function deleteAllDataOf(req, res) {
    if (!validToken(req.headers["x-access-token"]))
        return res.status(403).end()

    deleteData(req, res, DATA_FILE)
}

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