const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Project name is required.'],
        trim: true,
        maxLength: [50, 'A task name must have less than or equal 40  characters'],
        minLength: [10, 'A task name must have more than or equal 10 characters'],
    },
    dueDate: {
        type: Date,
        default: Date.now(),
        required: [true, 'due date is required']
        
    },
    description: {
        type: String,
        required: [true, 'Please provide task description']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedTo: {
        type: String,
        required: [true, 'Please assign task to user']
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Project', ProjectSchema);