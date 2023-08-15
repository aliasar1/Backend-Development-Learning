const mongoose = require('mongoose');

module.exports = function (req, res, next){
    if(!mongoose.types.ObjectId.isValid(req.prams.id)){
        return res.status(404).send('Invalid id');
    }
    next();
}