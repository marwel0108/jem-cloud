
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
    limStorage: {
        type: Number,
        default: 255
    },
    currentStorage:{
        type: Number
    }
});

JEMClouderSchema.methods.toJSON = () => {

    const { __v, password, _id, ...user  } = this.toObject();

    user.uid = _id;

    return user
}

module.exports = model('JEMClouder', JEMClouderSchema);