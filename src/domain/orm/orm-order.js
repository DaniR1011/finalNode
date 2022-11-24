const conn = require("../repositories/mongo.repository");
const magic = require('../../utils/magic');

exports.GetAll = async() => {
    try {
        return await conn.db.connMongo.Order.find();
    } catch (error) {
        magic.LogDanger("Cannot get the Order");
        return await { error: { code:123, message: error } };
    }
};

exports.Create = async(Name, Feeding, Incisors, Families, Class) => {
    try {
        const data = await new conn.db.connMongo.Order({
            name: Name,
            feeding: Feeding,
            incisors: Incisors,
            families: Families,
            class: Class
        });
        data.save();
        return true
    } catch (error) {
        magic.LogDanger("Cannot create Order");
        return await { error: { code:123, message: error } };
    }
};