const conn = require("../repositories/mongo.repository");
const magic = require('../../utils/magic');

exports.GetAll = async() => {
    try {
        return await conn.db.connMongo.Species.find();
    } catch (error) {
        magic.LogDanger("Cannot get the Species");
        return await { error: { code:123, message: error } };
    }
};

exports.Create = async(Name, Habitat, Size, Taxonomy, Image) => {
    try {
        const data = await new conn.db.connMongo.Species({
            name: Name,
            habitat: Habitat,
            size: Size,
            taxonomy: Taxonomy,
            image: Image
        });
        data.save();
        return true
    } catch (error) {
        magic.LogDanger("Cannot create Species");
        return await { error: { code:123, message: error } };
    }
}