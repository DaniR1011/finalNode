module.exports = (db) => {
    const familySchema = new db.Schema({
        name: {type: String, required: true},
        reproduction: {type: String, required: true},
        class: {type: db.Schema.Types.ObjectId, ref: 'class', required: true},
        order: {type: db.Schema.Types.ObjectId, ref: 'order', required: true},
        species: {type: db.Schema.Types.ObjectId, ref: 'species', required: true}
    },
    {
        timestamps: true,
    }
    );
    return db.model("family", familySchema);
}