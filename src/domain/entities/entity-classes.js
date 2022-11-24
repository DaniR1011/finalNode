module.exports = (db) => {
    const classesSchema = new db.Schema({
        name: {type: String, required: true},
        reproduction: {type: String, required: true},
        incubation: {type: String, required: true},
        skeletonType: {type: String, required: true},
        skinType: {type: String, required: true},
        orders: [{type: db.Schema.Types.ObjectId, ref: 'order', required: true}]
    },
    {
        timestamps: true,
    }
    );
    return db.model("classes", classesSchema);
}