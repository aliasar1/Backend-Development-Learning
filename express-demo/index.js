const express = require('express');
const app = express();
const Joi = require('joi');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const courses = require('./routes/courses');
const home = require('./routes/home');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use('api/courses/',courses);
app.use('/', home);

app.set('view engine', 'pug');
app.set('views', './views');

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

dbDebugger('Connected to database..');

console.log('Application name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
//console.log('Mail Password: ' + config.get('mail.password'));


// PORT
const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Listening to port ${port}`));