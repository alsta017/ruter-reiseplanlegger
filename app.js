const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser');
var path = require("path");


// Koble til database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'IMKuben1337!',
    database: 'oppgavedb',
    connectionLimit: 5,
});

const app = express();

app.use(bodyParser.json());

// Ny session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/src', express.static(path.join(__dirname + '/src')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/src/html/index.html');
});

app.get('/ekstra_valg', function(req, res) {
    res.sendFile(__dirname + '/src/html/ekstra_valg.html');
});

app.get('/reiseplanlegger', function(req, res) {
    res.sendFile(__dirname + '/src/html/reiseplanlegger.html');
});

app.get('/trip', function(req, res) {
    res.sendFile(__dirname + '/src/html/trip.html');
});

app.get('/lagre_reisen', function(req, res) {

});

app.listen(3000);