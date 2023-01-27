require('dotenv').config();
const http = require('http');
const port = process.env.PORT || 8000;

const { 
    SignUp, 
    SignIn,
    getAllUsers
} = require('./controllers/auth');

const {
    GetAllTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    addComment
} = require('./controllers/tickets');

const Home = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1 style="text-align: center;">Welcome to the Resolver One Backend</h1>');
    res.end();
}

const NotFound = (req, res) => {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write('<h1>404 Not Found</h1>');
    res.end();
}

// const {MongoClient} = require('mongodb');
// MongoClient.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,  
//     useUnifiedTopology: true,
// }).then(e => {
//     console.log('Connected to DB');
// }).catch(error => console.error(error));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(e => {
    console.log('Connected to DB');
}).catch(error => console.error(error));


const server = http.createServer((req, res) => {
    let url = req.url;
    if (url === '/') {
        Home(req, res);
    } else if (url === '/signup') {
        SignUp(req, res);
    } else if (url === '/signin') {
        SignIn(req, res);
    } else if (url === '/tickets') {
        GetAllTickets(req, res);
    } else if (url === '/create-ticket') {
        createTicket(req, res);
    } else if (url === '/update-ticket') {
        updateTicket(req, res);
    } else if (url === '/delete-ticket') {
        deleteTicket(req, res);
    } else if (url === '/add-comment') {
        addComment(req,res);
    } else if (url === '/get-all-users') {
        getAllUsers(req, res);
    } else {
        NotFound(req, res);
    }
});



server.listen(port, () => {
    console.log(`Server running at port `+port);
});

