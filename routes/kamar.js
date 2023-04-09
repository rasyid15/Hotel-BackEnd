const express = require('express')
const app = express()
app.use(express.json())
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const roomController = require("../controllers/kamar.controller");
const auth = require(`../auth/auth`)

app.get("/all", auth.authVerify, roomController.getAllKamar)
app.post("/available", auth.authVerify, roomController.availableRoom)
app.post("/find", auth.authVerify, roomController.findKamar)
app.post("/add", auth.authVerify, roomController.addKamar)
app.delete("/:id", auth.authVerify, roomController.deleteKamar)
app.put("/:id", auth.authVerify, roomController.updateKamar)

module.exports = app