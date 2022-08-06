const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    token: {
        type: String
    },

    confirmed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

UserSchema.methods.toJSON = function() {

    const { __v, _id, password, token, ...rest } = this.toObject();

    rest.uid = _id;

    return rest;
}

module.exports = model( 'User', UserSchema );