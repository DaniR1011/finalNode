const config = require("config-yml");
const mongoose = require('mongoose');
const magic = require('../../utils/magic');
const classes = require('../entities/entity-classes');
const order = require('../entities/entity-order');
const family = require('../entities/entity-family');
const species = require('../entities/entity-species');
const dotenv = require('dotenv');

dotenv.config();

let db = {};

if(config.db.mongodb && config.db.mongodb.length > 0){
    config.db.mongodb.map((c)=> {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        db[c.nameconn] = {};
        db[c.nameconn].conn = mongoose;
        db[c.nameconn].Classes = classes(mongoose);
        db[c.nameconn].Order = order(mongoose);
        db[c.nameconn].Family = family(mongoose);
        db[c.nameconn].species = species(mongoose);
    });
    exports.db = db;
    magic.LogInfo("Connecting to the data base")
} else {
    magic.LogDanger('Data base does not exists');
}