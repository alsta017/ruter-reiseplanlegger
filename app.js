const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
var path = require("path");

// Koble til database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'IMKuben1337!',
    database: 'oppgavedb'
})