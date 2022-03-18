/* eslint-disable prettier/prettier */


const { Server } = require('socket.io');
const {Client}= require ('pg')

const express = require('express');

const app = express();

const http = require('http');

const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
/* const client= new Client('postgres://postgres:postgres@localhost:15432/default_database') */
const client= new Client({
  host:'localhost',
  user:"postgres",
  port: 15432,
  database:'default_database',
  password:"postgres"
})

console.log(client)

client.connect();
/* 
client.query('Select * from users', (err,res)=>{
  if(!err){
    console.log(res.rows);
  }else{
    console.log(err.message);
  }
   client.end();
})
 */


io.on('connection', (socket) => {
  console.log('usuario conectado', socket.id);
  socket.on('join_canal', (data) => {
    socket.join(data);
    console.log('user con id: ', socket.id, ' unido al canal: ', data);
    client.query(`INSERT INTO users (id_user, name_user,email_user) VALUES (7, 'Alex', ${data} )`, (err, res)=>{
      if (err) {
          console.error(err);
          return;
      }
      
      console.log('Data insert successful',res);
      client.end();
  })

  });

  socket.on('send_message', (data) => {
  
    socket.to(data.canal).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('user desconectado', socket.id);
  });
});
server.listen(3001, () => {
  console.log(`Servidor inicializado`);
});
  // eslint-disable-next-line no-unused-vars
    /* client.query(`insert into usuarios (id, nombre) values ( ${socket.id}, 'Will' )`, (err, res)=>{
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data insert successful');
        client.end();
    }) */


/*     pgadmin:
    image: 'dpage/pgadmin4:5.6'
    depends_on:
      - postgres
    ports:
      - 15432:80
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@pgadmin.com
      PGADMIN_DEFAULT_PASSWORD: pgadmin
      PGADMIN_LISTEN_PORT: 80
    volumes:
      - pgadmin:/var/lib/pgadmin

volumes:
  postgres:
  pgadmin:
 */