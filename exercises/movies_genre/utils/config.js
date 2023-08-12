const dotenv = require('dotenv');

module.exports = function(){
    dotenv.config();

    if(!process.env.JWT_KEY){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}