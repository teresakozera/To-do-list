const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors')
const users = require('./routes/users.js');
const auth = require('./routes/auth.js');
const express = require('express');
const app = express();

// najpierw trzeba ustawic zmienna globalna
// set todolist_jwtPrivateKey=mySecureKey
if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/to_do_list', {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then(() => console.log('connected'))
    .catch(err => console.error('could not connect', err));

app.use(express.json());
app.use(cors());
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));