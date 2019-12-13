const mongoose = require('mongoose');
const users = require('./routes/users.js');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/to_do_list', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('connected'))
    .catch(err => console.error('could not connect', err));

app.use(express.json());
app.use('/api/users', users);

const port = process.env.PORT ||  3000;
app.listen(port,()=> console.log(`listening on port ${port}`)); 