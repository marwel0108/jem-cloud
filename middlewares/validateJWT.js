const jwt = require('jsonwebtoken');
const { request, response } = require('express');

const { JEMClouder } = require('../models/index')

const validateJWT = async ( req = request, res = response, next ) => {

    const token = req.signedCookies.jemclouder;

    if ( !token ) return res.status(401).json({
        error: 'There is no token on the request'
    });

    try {
        
        const { uid } = jwt.verify( token, process.env.MYSECRETKEY );

        const { name, currentStorage, remainingStorage } = await JEMClouder.findById( uid );

        req.uid = uid;

        req.user = {
            name,
            currentStorage,
            remainingStorage
        };

        next();
    } catch (err) {
        console.log(err);

        res.status(401).json({
            error: 'Invalid Token'
        });
    }

}


module.exports = validateJWT