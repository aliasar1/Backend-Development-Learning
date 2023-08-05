const mongoose = require('mongoose');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

mongoose.connect('mongodb://127.0.0.1/customers',{
        family: 4,
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Cound not connect to MongoDB', err));

app.use(express.json());
app.use('/api/customers', customers);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));