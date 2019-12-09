const mongoose = require('mongoose');
const Joi = require('joi');

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
    },
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }   
});

const Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
    const schema = {
      text: Joi.string().min(3).max(63).required(),
      description: Joi.string(),
      date: Joi.date(),
      done: Joi.boolean(),
      listId: Joi.ObjectId().required()
    };
    return Joi.validate(task, schema);
}

// export
exports.Task = Task;
exports.validate = validateTask;
//exports.taskSchema = taskSchema;