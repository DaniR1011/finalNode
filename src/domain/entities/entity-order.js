module.exports = (db) => {
    const orderSchema = new db.Schema({
        name: {type: String, required: true},
        feeding: {type: String, required: true},
        incisors: {type: String, required: true},
        families: [{type: db.Schema.Types.ObjectId, ref: 'family', required: true}],
        class: {type: db.Schema.Types.ObjectId, ref: 'class', required: true}
    },
    {
        timestamps: true,
    }
    );
    return db.model("order", orderSchema);
}