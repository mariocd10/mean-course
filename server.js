const http = require('http');
const app = require('./backend/app');
const port = process.env.PORT || 3000;
// set config for express app
app.set('port', port);

// handle requests with the express app
const server = http.createServer(app);

server.listen(port);
