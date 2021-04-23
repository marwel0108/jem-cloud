const { request, response } = require('express');


const { moveFilesToStorage, fromRouteToPath, listDir } = require('../helpers');
const JEMClouder = require('../models/JEMClouder');
const File = require('../models/File');

let url = '/profile';

// Controller to render the profile.hbs file and serve it on /profile request
const getProfile = async ( req = request, res = response ) => {

    const { uid, baseUrl } = req;
    const { pathToElement } = req.params;
    let jemclouder = await JEMClouder.findById( uid );
    jemclouder = jemclouder.toJSON();

    const localPath = fromRouteToPath(pathToElement);
    
    const elements = await listDir(uid, localPath, pathToElement, baseUrl);
    url = '/profile/' + ((pathToElement === undefined) ? '' : pathToElement);
    res.render('pages/profile', {
        profileState: 'active disabled',
        jemclouder,
        items: elements
    });
}


const postFile = async ( req = request, res = response ) => {

    const { pathToElement } = req.params;
    const { JEMCloudFile } = req.files
    const { name, size, tempFilePath } = JEMCloudFile;
    const [, ext] = name.split('.');
    const { uid } = req;
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const localPath = fromRouteToPath(pathToElement)
    moveFilesToStorage( tempFilePath, localPath, uid, name );
    const file = new File({ 
        name: name,
        path: localPath,
        JEMClouder_id: uid,
        extension: ext,
        uploadedAt: date,
        fileSize: size
    });

    try {
        
        // await file.save();

        res.redirect(url)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            err: 'Something went wrong'
        })
    }
}

module.exports = {
    getProfile,
    postFile
}
