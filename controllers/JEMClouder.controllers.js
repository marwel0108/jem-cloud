const { request, response } = require('express');


const { moveFilesToStorage, fromRouteToPath, listDir, byteUnitsDictionary, createFolder } = require('../helpers');
const { File, JEMClouder } = require('../models/index');

let url = '/profile';

function getConvertedCurrentStorage( currentStorage ) {

    const { bytes, KB, MB } = byteUnitsDictionary;
    if ( currentStorage >= bytes && currentStorage <= KB ) {
        return `${currentStorage.toFixed(2)} bytes`;
    } else if( currentStorage >= KB && currentStorage <= MB ) {
        return `${(currentStorage / KB).toFixed(2)} KB`;
    } else {
        return `${(currentStorage / MB).toFixed(2)} MB`;
    }
}

// Controller to render the profile.hbs file and serve it on /profile request
const getProfile = async ( req = request, res = response ) => {

    const { type, extension } = req.query
    const { uid, baseUrl, user } = req;
    let { pathToElement } = req.params;
    const localPath = fromRouteToPath(pathToElement);
    url = '/profile/' + ((pathToElement === undefined) ? '' : pathToElement);

    
    if ( type === 'folder' || type === undefined) {

        const elements = await listDir(uid, localPath, pathToElement, baseUrl);
        return res.render('pages/profile', {
            profileState: 'active disabled',
            // jemclouder,
            items: elements,
            jemclouder: {
                name: user.name,
                currentStorage: getConvertedCurrentStorage(user.currentStorage),
                remainingStorage: getConvertedCurrentStorage(user.remainingStorage)
            },
            url
        });
    } else {

        const localPathArray = localPath.split('/');
        const name = localPathArray.pop();

        const file = await File.findOne({
            name: name,
            path: localPathArray.join('/'),
            JEMClouder_id: uid,
            extension: extension
        });

        res.json(file)

    }

    
}


const postFile = async ( req = request, res = response ) => {

    const { pathToElement } = req.params;
    const localPath = fromRouteToPath(pathToElement);

    if (req.query === 'file') {
        const { JEMCloudFile } = req.files;
        const { name, size, tempFilePath } = JEMCloudFile;
        const [, ext] = name.split('.');
        const { uid } = req;
        const today = new Date();
        const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        
        try {
            const file = new File({ 
                name: name.split('.')[0],
                path: localPath,
                JEMClouder_id: uid,
                extension: ext,
                uploadedAt: date,
                fileSize: size
            });

            if (await File.findOne(file)) return res.json({
                err: 'File already exists'
            });

            
            await file.save();

            moveFilesToStorage( tempFilePath, localPath, uid, name );

            const { currentStorage } = req.user;

            await JEMClouder.findByIdAndUpdate( uid, {
                currentStorage: currentStorage + size
            });

            res.redirect(url);

        } catch (err) {
            console.log(err);
            return res.status(500).json({
                err: 'Something went wrong'
            })
        }
    } else {
        
        try {
            await createFolder(localPath, req.uid, req.body.folderName );
            res.redirect(url);
        } catch (error) {
            return res.json({error})
        }
    }
    
}

module.exports = {
    getProfile,
    postFile
}
