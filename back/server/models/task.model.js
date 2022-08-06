const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: Boolean,
        default: false
    },

    delivery: {
        type: Date,
        default: Date.now()
    },

    priority: {
        type: String,
        required: true,
        enum: ['Baja', 'Media', 'Alta']
    },

    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },

    complete: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, { timestamps: true });

module.exports = model( 'Task', TaskSchema );