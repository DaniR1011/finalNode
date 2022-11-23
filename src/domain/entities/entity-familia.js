module.exports = (db) => {
    const familiaSchema = new db.Schema({
        nombre: {type: String, required: true},
        reproduccion: {type: String, required: true},
        lactancia: {type: String, required: true},
        esqueleto: {type: String, required: true},
        piel: {type: String, required: true},
        ordenes: {type: String, required: true}
    },
    {
        timestamps: true,
    }
    );
    return db.model("clase", familiaSchema);
}