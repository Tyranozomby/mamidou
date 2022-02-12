const express = require('express');
const app = express();
const fs = require("fs");

app.use(express.json());

const CHILDREN_FILE = __dirname + "/../data/children.json";
const DATA_FILE = __dirname + "/../data/data.json";

// ---------- GET ----------
// Tous les enfants
app.get('/api/children', (req, res) => {

    fs.readFile(CHILDREN_FILE, 'utf8', function (err, data) {
        console.log(data);
        res.send(data);
    });
})

// Un enfant précis
app.get('/api/children/:child', (req, res) => {
    const child = req.params.child;
    fs.readFile(CHILDREN_FILE, 'utf8', function (err, data) {
        const json = JSON.parse(data);

        const txt = JSON.stringify(json[child]);
        console.log(txt);
        res.send(txt);
    });
})

// Toutes les données
app.get('/api/data', (req, res) => {

    fs.readFile(DATA_FILE, 'utf8', function (err, data) {
        console.log(data);
        res.send(data);
    });
})

// Des données précises
app.get('/api/data/:child', (req, res) => {
    const child = req.params.child;

    fs.readFile(DATA_FILE, 'utf8', function (err, data) {
        const json = JSON.parse(data);

        const txt = JSON.stringify(json[child]);
        console.log(txt);
        res.send(txt);
    });
})


// ---------- PATCH ----------
// Modifier une donnée spécifique d'un enfant
app.patch("/api/data/:child/:date", (req, res) => {
    const child = req.params.child;
    const date = req.params.date.replaceAll("-", "/");
    const newVal = req.body.value;

    fs.readFile(DATA_FILE, 'utf8', function (err, data) {
        let json = JSON.parse(data)
        if (json[child] && newVal)
            for (let i = 0; i < json[child].length; i++)
                if (json[child][i].date === date)
                    json[child][i].value = newVal;

        const txt = JSON.stringify(json);
        fs.writeFile(DATA_FILE, txt, (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log("Résultat: " + txt);
                res.send(txt);
            }
        })
    });
});

// Modifier la couleur d'un enfant
app.patch("/api/children/:child", (req, res) => {
    const child = req.params.child;
    const newColor = req.body.color;

    fs.readFile(CHILDREN_FILE, 'utf8', function (err, data) {
        const json = JSON.parse(data)

        if (json[child] && newColor)
            json[child].color = newColor;

        const txt = JSON.stringify(json);
        fs.writeFile(CHILDREN_FILE, txt, (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log("Résultat: " + txt);
                res.send(txt);
            }
        })
    });
});


// ---------- PUT ----------
// Ajouter un enfant
app.put("/api/children/:child", (req, res) => {
    const child = req.params.child;

    if (!req.body.date)
        req.body.date = "01/01/2022"
    if (!req.body.color)
        req.body.color = "#FFFFFF"

    const val = {"date ": req.body.date, "color": req.body.color};

    fs.readFile(CHILDREN_FILE, 'utf8', function (err, data) {
        let json = JSON.parse(data)

        json[child] = val;

        const txt = JSON.stringify(json);
        fs.writeFile(CHILDREN_FILE, txt, (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log("Résultat: " + txt);
                res.send(txt);
            }
        })
    });
});

// Ajouter une donnée
app.put("/api/data/:child", (req, res) => {
    const child = req.params.child;

    if (!req.body.date)
        req.body.date = "01/01/2022"
    if (!req.body.value || !Number.isInteger(req.body.value))
        req.body.value = 0


    const val = {"date ": req.body.date, "value": req.body.value};

    fs.readFile(DATA_FILE, 'utf8', function (err, data) {
        let json = JSON.parse(data)

        if (!json[child])
            json[child] = [];

        if (Array.isArray(val))
            json[child].concat(val);
        else
            json[child].push(val);

        const txt = JSON.stringify(json);
        fs.writeFile(DATA_FILE, txt, (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log("Résultat: " + txt);
                res.send(txt);
            }
        })
    });
});


// ---------- DELETE ----------
// Éradiquer un enfant
app.delete("/api/children/:child", (req, res) => {
    deleteData(req, res, CHILDREN_FILE)
});

// Supprimer les données d'un enfant
app.delete("/api/data/:child", (req, res) => {
    deleteData(req, res, DATA_FILE)
});

// Supprimer une donnée d'un enfant
app.delete("/api/data/:child/:position", (req, res) => {
    const child = req.params.child;
    const position = req.params.position;

    fs.readFile(DATA_FILE, 'utf8', function (err, data) {
        let json = JSON.parse(data)

        if (json[child])
            json[child].splice(position, 1);

        const txt = JSON.stringify(json);
        fs.writeFile(DATA_FILE, txt, (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log("Résultat: " + txt);
                res.send(txt);
            }
        })
    });
});


// COMMENCER ÉCOUTE
app.listen(3000, function () {
    console.log("J'écoute");
});


// FONCTIONS
function deleteData(req, res, path) {
    const child = req.params.child;

    fs.readFile(path, 'utf8', function (err, data) {
        let json = JSON.parse(data)
        delete json[child];

        const txt = JSON.stringify(json);
        fs.writeFile(path, txt, (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log("Résultat: " + txt);
                res.send(txt);
            }
        })
    });
}