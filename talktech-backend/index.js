/* eslint-disable prettier/prettier */

const { Server } = require('socket.io');

const express = require('express');

const app = express();

const http = require('http');

const cors = require('cors');

// const { Client } = require('pg');


app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

 
// app.use(express.static(__dirname,'./build'));

io.on('connection', (socket) => {
  console.log('usuario conectado', socket.id);
  socket.on('join_canal', (data) => {
    socket.join(data);
    console.log('user con id: ', socket.id, ' unido al canal: ', data);
    // addPostUser().then((result)=> console.log(result))
  });

  socket.on('send_message', (data) => {
    // eslint-disable-next-line no-unused-vars
    /* client.query(`insert into usuarios (id, nombre) values ( ${socket.id}, 'Will' )`, (err, res)=>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data insert successful');
        client.end();
    }) */
    socket.to(data.canal).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('user desconectado', socket.id);
  });
});
server.listen(3001, () => {
  console.log(`Servidor inicializado`);
});
