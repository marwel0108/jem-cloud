const fs = require('fs');
const path = require('path')

const moveFilesToStorage = ( currentPath, name ) => {

    const newPath = __dirname;
    fs.rename( currentPath, path.join(newPath, `../storage/${name}`), (err) => {
        if (!err) console.log('File saved');
        else console.log(err);
    })

}

module.exports = moveFilesToStorage;