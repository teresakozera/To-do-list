const mongoose = require('mongoose');
const Joi = require('joi');

// mongoose.connect('mongodb://localhost/to_do_list')
//     .then(() => console.log('connected'))
//     .catch(err => console.error('could not connect', err));

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 63
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    done: {
        type: Boolean, 
        default: false
    }
});

const Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
    const schema = {
      text: Joi.string().min(3).max(63).required(),
      description: Joi.string(),
      date: Joi.date(),
      done: Joi.boolean()
    };
    return Joi.validate(task, schema);
}

// export
