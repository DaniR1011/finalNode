module.exports = (db) => {
    const ordenSchema = new db.Schema({
        nombre: {type: String, required: true},
        alimentacion: {type: String, required: true},
        incisivos: {type: String, required: true},
        clase: {type: String, required: true}
    },
    {
        timestamps: true,
    }
    );
    return db.model("clase", ordenSchema);
}