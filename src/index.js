require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const { socketController } = require('./socket');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// routes
app.use(require('./routes/index'));

app.use(require('./routes/contacts'));

const server = app.listen(process.env.PORT);
console.log('Server on port process');

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
io.on('connection', socketController);
