
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
        default: 255
    },
    currentStorage:{
        type: Number,
        default: 0
    }
});

JEMClouderSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user  } = this.toObject();

    user.uid = _id;

    return user;
}
module.exports = model('JEMClouder', JEMClouderSchema);