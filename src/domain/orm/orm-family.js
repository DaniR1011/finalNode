const conn = require("../repositories/mongo.repository");
const magic = require('../../utils/magic');

exports.GetAll = async() => {
    try {
        return await conn.db.connMongo.Family.find();
    } catch (error) {
        magic.LogDanger("Cannot get the Family");
        return await { error: { code:123, message: error } };
    }
};

exports.Create = async(Name, Reproduction, Class, Order, Species) => {
    try {
        const data = await new conn.db.connMongo.Family({
            name: Name,
            reproduction: Reproduction,
            class: Class,
            order: Order,
            species: Species
        });
        data.save();
        return true
    } catch (error) {
        magic.LogDanger("Cannot create Family");
        return await { error: { code:123, message: error } };
    }
}