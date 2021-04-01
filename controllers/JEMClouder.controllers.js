const { request, response } = require('express');
const path = require('path')

const JEMClouder = require('../models/JEMClouder');

// Controller to render the profile.hbs file and serve it on /profile request
const getProfile = async ( req = request, res = response ) => {

    const { uid } = req;

    let jemclouder = await JEMClouder.findById( uid );

    jemclouder = jemclouder.toJSON();


    res.render('pages/profile', {
        nombre: 'Profile',
        profileState: 'active disabled',
        jemclouder
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

const postFile = ( req = request, res = response ) => {

    const file = req.files.JEMCloudFile;

    const uploadPath = path.join(__dirname, `../uploads/${file.name}`)

    file.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err)
    })

    res.json({
        msg: 'Archivo subido'
    })
}

module.exports = {
    getProfile,
    getFolder,
    getFile,
    postFile
}
