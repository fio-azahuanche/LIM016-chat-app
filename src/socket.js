/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
// const { v4 } = require('uuid');

const { Client } = require('pg');
/* const express = require('express');

const app = express();
const http = require('http');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
}); */

// * This is the postgres connection to node
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 15432,
  database: 'default_database',
  password: 'postgres',
}); 

client.connect();



const socketController = async (socket) => {
  console.log('usuario conectado', socket.id);
  socket.on('join_canal', async (data) => {
    socket.join(data);
    // getHistoryMsg();
  });

  socket.on('send_message', async(data) => {
    const arrayTime = data.time.split('/');
    const fechaHora = arrayTime[2].split(' ')
    let newTime;
    if(arrayTime[0].length===2 && arrayTime[1].length===2){
      newTime= `${fechaHora[0]}/${arrayTime[1]}/${arrayTime[0]} ${fechaHora[1]}`
    }else if(arrayTime[0].length===2 && arrayTime[1].length===1){
      newTime=`${fechaHora[0]}/0${arrayTime[1]}/${arrayTime[0]} ${fechaHora[1]}`
    }else{
      newTime=`${fechaHora[0]}/0${arrayTime[1]}/0${arrayTime[0]} ${fechaHora[1]}`
    };
    console.log(newTime);
    const prueba= await client.query(`insert into history(date_history,id_author,id_channel,message_history) values ('${newTime.toString()} America/Lima',${data.id_author},${data.canal},'${data.message}')`)
    console.log(prueba);
    socket.to(data.canal).emit('receive_message', data);

  });

  socket.on('disconnect', () => {
    console.log('user desconectado', socket.id);
  });
}

/* server.listen(3001, () => {
  console.log(`Servidor inicializado en 3001`);
}); */

module.exports = {
  /* io, */
  socketController
} 