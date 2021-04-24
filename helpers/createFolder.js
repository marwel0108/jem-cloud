const fs = require('fs');
const path = require('path');

const createFolder = async (folderPath, uid, name) => {

    const nPath = (folderPath === '') ? `${name}` : `${folderPath}/${name}`
    try {
        
        await fs.mkdirSync(path.join(__dirname, `../storage/${uid}/${nPath}`));
        console.log('Folder Created');
    } catch (error) {
        console.log(error);
    }
}

module.exports = createFolder;