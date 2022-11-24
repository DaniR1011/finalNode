const conn = require("../repositories/mongo.repository");
const magic = require('../../utils/magic');

exports.GetAll = async() => {
    try {
        return await conn.db.connMongo.User.find();
    } catch (error) {
        magic.LogDanger("Cannot get the User");
        return await { error: { code:123, message: error } };
    }
};

exports.Create = async(Username, Password, Avatar) => {
    try {
        const data = await new conn.db.connMongo.User({
            username: Username,
            password: Password,
            avatar: Avatar
        });
        data.save();
        return true
    } catch (error) {
        magic.LogDanger("Cannot create User");
        return await { error: { code:123, message: error } };
    }
}