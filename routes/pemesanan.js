const express = require('express')
const app = express()
app.use(express.json())

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pemesananController = require("../controllers/pemesanan.controller")
const auth = require(`../auth/auth`)

app.get("/all", auth.authVerify, pemesananController.getAllPemesanan)
app.get("/find", auth.authVerify, pemesananController.find)
app.post("/add", auth.authVerify, pemesananController.addPemesanan)
app.delete("/:id", auth.authVerify, pemesananController.deletePemesanan)
app.put("/:id", auth.authVerify, pemesananController.updatePemesanan)

module.exports = app