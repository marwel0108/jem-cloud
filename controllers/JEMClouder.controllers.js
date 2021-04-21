const { request, response } = require('express');
const fs = require('fs');
const path = require('path');

const { generateHashedString, moveFilesToStorage } = require('../helpers');

const JEMClouder = require('../models/JEMClouder');
const File = require('../models/File');

// Controller to render the profile.hbs file and serve it on /profile request
const getProfile = async ( req = request, res = response ) => {

    const { uid } = req;
    const { pathToElement } = req.params;
    let jemclouder = await JEMClouder.findById( uid );
    jemclouder = jemclouder.toJSON();
    let elementos;

    const localPath = (pathToElement === undefined) ? '' : pathToElement.split('-').join('/')
    elementos = fs.readdirSync(path.join(__dirname, `../storage/${uid}/${localPath}`))
    console.log(localPath);
    console.log(elementos)
    res.render('pages/profile', {
        nombre: 'Profile',
        profileState: 'active disabled',
        jemclouder,
        items: [...elementos]
    });
}

// Controller to render the folder.hbs file and serve it on /profile/folder request
const getFolder = ( req = request, res = response ) => {

    res.render('pages/folder', {
        nombre: 'Folder'
    });
}

// Controller to render the file.hbs file and serve it on /profile/file request
const getFile = ( req = request, res = response ) => {
    res.render('pages/file', {
        nombre: 'File'
    });
}

const postFile = async ( req = request, res = response ) => {

    const path = req.params.path;
    // const { name, size } = req.files.JEMCloudFile;
    // const [fileName, ext] = name.split('.');
    // const hashedName = generateHashedString(fileName);
    // req.files.JEMCloudFile.name = `${hashedName}.${ext}`;
    // const { uid } = req;
    // const today = new Date();
    // const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    // // moveFilesToStorage( JEMCloudFile.tempFilePath, JEMCloudFile.name );
    // const file = new File({ 
    //     name: fileName,
    //     hashedName,
    //     JEMClouder_id: uid,
    //     extension: ext,
    //     uploadedAt: date,
    //     fileSize: size
    // })

    try {
        
        // const jemFile = await file.save();
        res.json({
            path,
            baseUrl
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            err: 'Something went wrong'
        })
    }
    
}

module.exports = {
    getProfile,
    getFolder,
    getFile,
    postFile
}
