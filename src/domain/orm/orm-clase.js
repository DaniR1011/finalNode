const conn = require("../repositories/mongo.repository");
const magic = require('../../utils/magic');

exports.GetAll = async() => {
    try {
        return await conn.db.connMongo.Clase.find();
    } catch (error) {
        magic.LogDanger("Cannot get the Clase");
        return await { err: { code:123, message: error } };
    }
};

exports.Create = async(Nombre, Reproduccion, Lactancia, Esqueleto, Piel, Orden) => {
    try {
        const data = await new conn.db.connMongo.Clase({
            nombre: Nombre,
            reproduccion: Reproduccion,
            lactancia: Lactancia,
            esqueleto: Esqueleto,
            piel: Piel,
            orden: Orden
        });
        data.save();
        return true
    } catch (error) {
        magic.LogDanger("Cannot create Clase");
        return await { err: { code:123, message: error } };
    }
}