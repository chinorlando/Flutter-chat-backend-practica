const express = require('express');
const path = require('path');
require('dotenv').config();

// DB config 
// const {dbConnection} = require('./database/config');
// dbConnection();
require('./database/config').dbConnection();

// appa de express
const app = express();

// Lectura y parseo del body
app.use(express.json());

// Node server
const server = require('http').createServer(app);

module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicpath = path.resolve(__dirname, 'public');
app.use(express.static(publicpath));

// Mis rutas
app.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor escuchando en el puerto:', 3000);
});