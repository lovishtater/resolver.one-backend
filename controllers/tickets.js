const Tickets = require('../models/ticket');
const { getPostData, throwError, headers } = require('../utils/utils');

exports.GetAllTickets = (req,res) => {
    Tickets.find().exec((err, tickets) => {
        if (err) {
            throwError(res, err);
        } else {
            res.writeHead(200, headers);
            res.write(JSON.stringify({ tickets }));
            res.end();
        }
    });
}

exports.createTicket = async (req, res) => {
    const body = JSON.parse(await getPostData(req));
    const newTicket = new Tickets(body);

    newTicket.save((err, ticket) => {
        if (err) {
            throwError(res, err);
        } else {
            res.writeHead(200, headers);
            res.write(JSON.stringify({ ticket, message: 'Ticket created' }));
            res.end();
        }
    });
}

exports.updateTicket = async (req, res) => {
    const body = JSON.parse(await getPostData(req));
    Tickets.findOneAndUpdate({ _id: body._id }, body, { new: true }).exec((err, ticket) => {
        if (err) {
            throwError(res, err);
        } else {
            res.writeHead(200, headers);
            res.write(JSON.stringify({ ticket, message: 'Ticket updated' }));
            res.end();
        }
    });
}

exports.deleteTicket = (req, res) => {
    Tickets.findOneAndDelete({ _id: req.params.id }).exec((err, ticket) => {
        if (err) {
            throwError(res, err);
        } else {
            res.writeHead(200, headers);
            res.write(JSON.stringify({ ticket, message: 'Ticket deleted' }));
            res.end();
        }
    });
}

exports.addComment = async (req, res) => {
    const body = JSON.parse(await getPostData(req));
    Tickets.findOneAndUpdate({ _id: body._id }, {
        $push: {
            comments: body
        }
    }, { new: true }).exec((err, ticket) => {
        if (err) {
            throwError(res, err);
        } else {
            res.writeHead(200, headers);
            res.write(JSON.stringify({ ticket, message: 'Comment added' }));
            res.end();
        }
    }); 
}



