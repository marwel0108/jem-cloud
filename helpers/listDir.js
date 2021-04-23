const fs = require('fs');
const path = require('path');

const listDir = async (uid, localPath, pathToElement, baseUrl) => {
    const dir = await fs.readdirSync(path.join(__dirname, `../storage/${uid}/${localPath}`));
    const elements = dir.map(element => {
        return {
            name: element,
            url: baseUrl + '/' + ((pathToElement === undefined) ? '' : pathToElement + '-')
        }
    });

    return elements;
} 

module.exports = listDir;