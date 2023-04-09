'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class kamar extends Model {

        static associate(models) {

            this.belongsTo(models.tipe_kamar)
            this.hasMany(models.detail_pemesanan, {
                foreignKey: 'id',
                as: 'detail_pemesanan'
            })
        }
    }
    kamar.init({
        nomor_kamar: DataTypes.INTEGER,
        tipeKamarId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'kamar',
    });
    return kamar;
};