const http = require('http');
const app = require('./app');
const database = require('./db/database')

const port = process.env.PORT || 3000;

const server = http.createServer(app);

database.connect()
.then(() => {
    server.listen(port, () => console.log('server started'))
})
.catch((err) => console.error(err))