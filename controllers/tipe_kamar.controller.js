const { request, response } = require("express")
const express = require("express")
const app = express()
const tipeKamar = require(`../models/index`).tipe_kamar
const Op = require(`sequelize`).Op
const path = require(`path`)
const fs = require(`fs`)
const upload = require(`./uploadTipekamar`).single(`foto`)
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

exports.getAllType = async(request, response) => {
    let tipe = await tipeKamar.findAll()
    return response.json({
        success: true,
        data: tipe,
        message: `All room type has been loaded`
    })
}

exports.findType = async(request, response) => {
    let name = request.body.nama_tipe_kamar
    let tipe = await tipeKamar.findOne({
        where: {
            [Op.or]: [{
                nama_tipe_kamar: {
                    [Op.substring]: name
                }
            }]
        }
    })
    return response.json({
        success: true,
        data: tipe,
        message: `All room type have been loaded`
    })
}

exports.addType = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        if (!request.file) {
            return response.json({ message: `Nothing to upload` })
        }
        let newType = {
            nama_tipe_kamar: request.body.nama_tipe_kamar,
            harga: request.body.harga,
            deskripsi: request.body.deskripsi,
            foto: request.file.filename
        }
        console.log(newType)
        tipeKamar.create(newType)
            .then(result => {
                return response.json({
                    success: true,
                    data: result,
                    message: `New Room Type has been inserted`
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })


}

exports.updateType = (request, response) => {
    upload(request, response, async(error) => {
        if (error) {
            return response.json({ message: error });
        }
        let idType = request.params.id;
        let dataType = {
            nama_tipe_kamar: request.body.nama_tipe_kamar,
            harga: request.body.harga,
            deskripsi: request.body.deskripsi,
            foto: request.file.filename
        };

        if (request.file) {
            const selectedUser = await tipeKamar.findOne({
                where: { id: idType },
            });
            const oldFotoUser = selectedUser.foto;
            const patchFoto = path.join(__dirname, `../foto_tipe_kamar`, oldFotoUser);
            if (fs.existsSync(patchFoto)) {
                fs.unlink(patchFoto, (error) => console.log(error));
            }
            dataType.foto = request.file.filename;
        }
        tipeKamar
            .update(dataType, { where: { id: idType } })
            .then((result) => {
                return response.json({
                    success: true,
                    message: `Data room type has been update`,
                });
            })
            .catch((error) => {
                return response.json({
                    success: false,
                    message: error.message,
                });
            });
    });
};

exports.deleteType = (request, response) => {
    let idType = request.params.id
    tipeKamar.destroy({ where: { id: idType } })
        .then(result => {
            return response.json({
                success: true,
                message: `room type has been delete`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}