const jwt = require('jsonwebtoken');
const { request, response } = require('express');

const validateJWT = ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) return res.status(401).json({
        error: 'There is no token on the request'
    });

    try {
        
        const { uid } = jwt.verify( token, process.env.MYSECRETKEY )

        req.uid = uid;

        next();
    } catch (err) {
        console.log(err);

        res.status(401).json({
            error: 'Invalid Token'
        });
    }

}


module.exports = validateJWT