const conn = require("../repositories/mongo.repository");
const magic = require('../../utils/magic');

exports.GetAll = async() => {
    try {
        return await conn.db.connMongo.Classes.find();
    } catch (error) {
        magic.LogDanger("Cannot get the Classes");
        return await { error: { code:123, message: error } };
    }
};

exports.Create = async(Name, Reproduction, Incubation, SkeletonType, SkinType, Orders) => {
    try {
        const data = await new conn.db.connMongo.Classes({
            name: Name,
            reproduction: Reproduction,
            incubation: Incubation,
            skeletonType: SkeletonType,
            skinType: SkinType,
            orders: Orders
        });
        data.save();
        return true
    } catch (error) {
        magic.LogDanger("Cannot create Classes");
        return await { error: { code:123, message: error } };
    }
}