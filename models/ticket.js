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
        type: String,
    },
    createdBy: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        team: {
            type: String,
            required: true,
        },
    },
    comments: {
        type: Array,
    }
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);
