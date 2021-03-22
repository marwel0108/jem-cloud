
const { Schema, model } = require('mongoose'); 

const FolderSchema = Schema({

    name: {
        type: String,
        require: [true, 'The name of the folder is required']
    },
    path: {
        type: String,
        require: [true, 'The path in the user directory is needed']
    },
    publicationDate:{
        type: Date,
        default: Date.now()
    },
    lastModDate: {
        type: Date,
        default: Date.now()
    },
    userID: {
        type: ObjectId,
        require: [true, 'The id of the user is needed because of the relationship with the user that created it']
    }
});

FolderSchema.methods.toJSON = function () {
    
    const { _id, __v, userID, ...folder } = this.toObject();

    return folder;
}

module.exports = model('Folder', FolderSchema);