const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/to_do_list')
    .then(() => console.log('connected'))
    .catch(err => console.error('could not connect', err));
