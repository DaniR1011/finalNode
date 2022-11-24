module.exports = (db) => {
    const speciesSchema = new db.Schema({
        name: {type: String, required: true},
        habitat: {type: String, required: true},
        size: {type: String, required: true},
        taxonomy: {type: String, required: true},
        image: {type: String, required: true}
    },
    {
        timestamps: true,
    }
    );
    return db.model("species", speciesSchema);
}