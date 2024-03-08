const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    indentifiant: {
        type: String
    },
    password: {
        type: String
    },
    naissence: {
        type: Date
    },
    ville: {
        type: String
    },
    genre: {
        type: String
    },
    loisir: {
        type: [String]
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    preview: {
        type: String
    }
})
const UserModel = model("user", UserSchema);

module.exports = UserModel