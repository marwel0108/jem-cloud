const fs = require('fs');
const path = require('path');

const splitFileName = require('./splitFileName');
const buildUrl = require('./buildUrl');

const listDir = async (uid, localPath, pathToElement, baseUrl) => {
    const dir = await fs.readdirSync(path.join(__dirname, `../storage/${uid}/${localPath}`));
    const elements = dir.map(element => {
        const [name, type, extension] = splitFileName(element)
        return {
            name,
            url: buildUrl(baseUrl, pathToElement),
            type,
            extension
        }
    });

    return elements;
} 



module.exports = listDir;