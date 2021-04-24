const fs = require('fs');
const path = require('path');

const moveFilesToStorage = ( currentPath, newPath, uid, name ) => {
    
    const nPath = (newPath === '') ? `${name}` : `${newPath}/${name}`
    fs.rename( currentPath, path.join(__dirname, `../storage/${uid}/${nPath}`), (err) => {
        if (!err) console.log('File saved');
        else console.log(err);
    })
}

module.exports = moveFilesToStorage;