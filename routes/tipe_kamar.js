const express = require('express')
var bodyParser = require("body-parser");
const app = express()
app.use(express.json())
const tipeController = require("../controllers/tipe_kamar.controller");
const auth = require(`../auth/auth`)

app.get("/all", auth.authVerify, tipeController.getAllType)
app.post("/find", auth.authVerify, tipeController.findType)
app.post("/add", auth.authVerify, tipeController.addType)
app.delete("/:id", auth.authVerify, tipeController.deleteType)
app.put("/:id", auth.authVerify, tipeController.updateType)

module.exports = app