const express = require("express")
const app = express()
const {XCEPTIONS_KEY} = require("./config/secrets")
const {testConnection} = require('./config/db')
const {Client} = require("xceptions")


testConnection()
app.use(express.json())



app.use("/auth",require('./routes/authRoutes'))


const xceptionClient = new Client(XCEPTIONS_KEY);

xceptionClient.connect()
    .then((fielder) => {
        console.log("Connected to Xceptions");

        app.use((err, req, res, next) => {
            fielder.field(err, req, res, next);
        });
    })
    .catch((err) => {
        console.error("Error connecting to Xceptions:", err);
    });

module.exports = app