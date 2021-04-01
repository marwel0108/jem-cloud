const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid };
        const secret = process.env.MYSECRETKEY;

        jwt.sign( payload, secret, {
            expiresIn: '5h'
        }, ( err, token ) => {

            if ( err ) reject( err );
            else resolve( token );
        });
    });
}

module.exports = generateJWT;