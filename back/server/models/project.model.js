const { Schema, model } = require('mongoose');


const ProjectSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    description: {
        type: String,
        trim: true,
        required: true
    },

    delivery: {
        type: Date,
        default: Date.now()
    },

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    client: {
        type: String,
        trim: true,
        required: true
    },

    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],

    collaborators: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true });


ProjectSchema.methods.toJSON = function() {
    const { _v, ...rest } = this.toObject();
    return rest;
}

module.exports = model( 'Project', ProjectSchema );