require('dotenv').config();
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    let url = req.url;
    console.log(url);
    switch (url) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<h1>Welcome to Resolver.One</h1>');
            res.end();
            break;
            default:
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write('<h1>404 Not Found</h1>');
                res.end();
    }
});



server.listen(port, () => {
    console.log(`Server running at port `+port);
});

