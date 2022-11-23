const config = require("config-yml");
const mongoose = require('mongoose');
const magic = require('../../utils/magic');
const clase = require('../entities/entity-clase');
const orden = require('../entities/entity-orden');
const familia = require('../entities/entity-familia');
const especie = require('../entities/entity-especie');
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
        db[c.nameconn].Clase = clase(mongoose);
        db[c.nameconn].Orden = orden(mongoose);
        db[c.nameconn].Familia = familia(mongoose);
        db[c.nameconn].Especie = especie(mongoose);
    });
    exports.db = db;
    magic.LogInfo("Conectado con éxito a la base de datos")
} else {
    magic.LogDanger('No existe la base de datos');
}