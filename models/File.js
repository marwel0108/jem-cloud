const { Schema, model } = require('mongoose');

const FileSchema = Schema({
    name: {
        type: String,
        require: [true, 'The name of the file is required']
    },
    path: {
        type: String,
        require: [true, 'Final name when file saved required']
    },
    JEMClouder_id: {
        type: String,
        require: [true, 'The JEMClouder_id is needed']
    },
    extension: {
        type: String,
        require: [true, 'The extension of the file is required']
    },
    uploadedAt: {
        type: String,
        require: [true, 'You must provide the date when the file was uploaded']
    },
    fileSize: {
        type: Number,
        require: [true, 'The size of the file is required, in bytes']
    }
});

FileSchema.methods.toJSON = function() {
    const { _id, __v, path, JEMClouder_id, ...file } = this.toObject();

    file.id = _id;

    return file;
}


module.exports = model('File', FileSchema);