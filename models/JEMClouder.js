
const { Schema, model } = require('mongoose');

const JEMClouderSchema = Schema({
    name: {
        type: String,
        require: [true, 'The name is required']
    },
    email: {
        type: String,
        require: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'The password is required']
    },
    state: {
        type: Boolean,
        default: true
    },
    limStorage: {
        type: Number,
        default: 1048576
    },
    currentStorage:{
        type: Number,
        default: 0
    },
    remainingStorage: {
        type: Number,
        default: 0
    }
});

JEMClouderSchema.methods.toJSON = function () {
    const { __v, password, _id, uid, state, ...user  } = this.toObject();

    return user;
}
module.exports = model('JEMClouder', JEMClouderSchema);