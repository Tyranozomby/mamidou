const express = require('express');
const app = express();
const fs = require("fs")

app.use(express.json());

const cors = require('cors');
app.use(cors())

const connexion = require('./connexion.js')
const children = require('./children.js')
const data = require('./data')

process.env.NODE_ENV = process.env.NODE_ENV || "development"
require('dotenv-flow').config();

if (process.env.NODE_ENV === 'production') {
    console.log("Utilisation du fichier static")
    app.use(express.static(process.env.STATIC_PATH));
}


if (!process.env.JWT_SECRET) {
    throw "Variable d'environnement JWT_SECRET non trouvé"
}
if (!process.env.JWT_EXPIRATION) {
    throw "Variable d'environnement JWT_EXPIRATION non trouvé"
}
if (!process.env.PASSWORD) {
    throw "Variable d'environnement PASSWORD non trouvé"
}


if (!fs.existsSync("data/children.json")) {
    fs.writeFileSync("data/children.json", "{}")
}
if (!fs.existsSync("data/data.json")) {
    fs.writeFileSync("data/data.json", "{}")
}

// ---------- LOGIN ----------
// Connexion
app.post("/api/login", connexion.login)
// Rafraichir le token
app.get("/api/refreshToken", connexion.refreshToken)


// ---------- CHILDREN ----------
// Tous les enfants
app.get('/api/children', children.getAll)
// Un enfant précis
app.get('/api/children/:child', children.getChild)
// Ajouter un enfant
app.put("/api/children/:child", children.addChild);
// Modifier la couleur d'un enfant
app.patch("/api/children/:child", children.setChildColor);
// Éradiquer un enfant
app.delete("/api/children/:child", children.deleteChild);


// ---------- DATA ----------
// Toutes les données
app.get('/api/data', data.getAll)
// Des données précises
app.get('/api/data/:child', data.getData)
// Ajouter une donnée
app.put("/api/data/:child", data.addData);
// Modifier une donnée spécifique d'un enfant
app.patch("/api/data/:child/:date", data.editData);
// Supprimer les données d'un enfant
app.delete("/api/data/:child", data.deleteAllDataOf);
// Supprimer une donnée d'un enfant
app.delete("/api/data/:child/:position", data.deleteDataOf);


// COMMENCER ÉCOUTE

app.listen(process.env.API_PORT, function () {
    console.log(`Prêt à l'écoute sur le port ${process.env.API_PORT}`);
});