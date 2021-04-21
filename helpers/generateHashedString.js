
const bcryptjs = require('bcryptjs');

const generateHashedString = ( str = '' ) => {

    const salt = bcryptjs.genSaltSync();
    const hashedString = bcryptjs.hashSync(str, salt).split('/');
    return nString = hashedString.join('_');
}

module.exports = generateHashedString;