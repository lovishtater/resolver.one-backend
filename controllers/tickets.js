const Tickets = require('../models/ticket');
const { getPostData, throwError } = require('../utils/utils');

exports.GetAllTickets = (req,res) => {
    Tickets.find().exec((err, tickets) => {
        if (err) {
            throwError(res, err);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(tickets));
        }
    });
}

exports.createTicket = async (req, res) => {
    const body = JSON.parse(await getPostData(req));
    const { title, description, priority, status, assignedTo, createdBy } = body;
    const newTicket = new Tickets({
        title,
        description,
        priority,
        status,
        assignedTo,
        createdBy,
        comments
    });

    newTicket.save((err, ticket) => {
        if (err) {
            throwError(res, err);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                ticket,
                message: 'Ticket created successfully'
            }));
        }
    });
}

exports.updateTicket = async (req, res) => {
    const body = JSON.parse(await getPostData(req));
    const { title, description, priority, status, type, assignedTo, createdBy } = body;
    Tickets.findOneAndUpdate({ _id: req.params.id }, {
        title,
        description,
        priority,
        status,
        type,
        assignedTo,
        createdBy,
        comments
    }, { new: true }).exec((err, ticket) => {
        if (err) {
            throwError(res, err);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                ticket,
                message: 'Ticket updated successfully'
            }));
        }
    });
}

exports.deleteTicket = (req, res) => {
    Tickets.findOneAndDelete({ _id: req.params.id }).exec((err, ticket) => {
        if (err) {
            throwError(res, err);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                ticket,
                message: 'Ticket deleted successfully'
            }));
        }
    });
}

exports.addComment = async (req, res) => {
    const body = JSON.parse(await getPostData(req));
    const { comment } = body;
    Tickets.findOneAndUpdate({ _id: req.params.id }, {
        $push: {
            comments: comment
        }
    }, { new: true }).exec((err, ticket) => {
        if (err) {
            throwError(res, err);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                ticket,
                message: 'Comment added successfully'
            }));
        }
    });
}



