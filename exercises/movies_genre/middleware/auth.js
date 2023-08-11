const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try{
        const validToken = jwt.verify(token, process.env.JWT_KEY);
        req.user = validToken;
        if (validToken) {
            return next();
        }
    }
    catch(ex){
        res.status(400).send('Invalid token.');
    }
}