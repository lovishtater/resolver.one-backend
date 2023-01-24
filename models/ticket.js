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
        enum: ['Low', 'Medium', 'High']
    },
    assignedTo: {
        type: String,
    },
    createdBy: {
        type: String,
    },
    comments: {
        type: Array,
    }
}, {timestamps: true});

module.exports = mongoose.model("Ticket", ticketSchema);
