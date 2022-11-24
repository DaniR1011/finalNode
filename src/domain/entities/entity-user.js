const bcrypt = require('bcrypt');

module.exports = (db) => {
    const userSchema = new db.Schema({
        username: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        avatar: { type: String, required: true}
    },
    {
        timestamps: true
    })
    userSchema.pre('save', function(next) {
        this.password = bcrypt.hashSync(this.password, 10)
        next()
    })
    return db.model('user', userSchema)
}