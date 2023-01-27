const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    status: {
        type: String,
        default: 'Open',
        enum: ['Open', 'In-progress', 'Resolved']
    },
    priority: {
        type: String,
        default: 'Low',
        enum: ['Low', 'Intermediate', 'High']
    },
    assignedTo: {
        _id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        team: {
            type: String,
            required: true,
        },
    },
    createdBy: {
        name: {
            type: String,
            required: true,
        },
        _id: {
            type: String,
            required: true,
        },
        team: {
            type: String,
            required: true,
        },
    },
    comments: [
        {
            _id:  {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);
