/* eslint-disable prettier/prettier */


const { Server } = require('socket.io');
const {Client}= require ('pg')

const express = require('express');
const jwt = require("jsonwebtoken");

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
/* io.use((socket,next)=>{
  const email=socket.handshake.auth.email;
  if(!email){
    return next(new Error("Invalid email"))
  }
  socket.email=email,
  socket.userId=
}) */
client.connect();

io.on('connection',(socket)=> {

  let tokenUser;
  console.log('usuario conectado', socket.id);
  socket.on('login_user', (data) => {
    socket.join(data);
    client.query(`SELECT id_user, email_user, password_user FROM  users WHERE '${data.email}'= email_user and '${data.password}'= password_user`, (err, res)=>{
      if (err) {
          console.error(err);
      }else{
        const userData=res.rows[0];
          jwt.sign({userData},'secretkey',(err,token)=>{
           tokenUser=({
            token,
            userData
          })
          console.log(tokenUser);
        });
          socket.to(data.email).emit('receive_login', userData);
       
      }
      client.end();
    })
  });
})

/* io.on('connection',(socket)=> {
  console.log('usuario conectado', socket.id);
  const idUser=(socket.id);
  console.log(idUser);
  socket.on('login_user', (data) => {
    socket.join(data);
    client.query(`INSERT INTO users (id_user, email_user, password_user) VALUES ('${idUser}','${data.email}', '${data.password}' )`, (err, res)=>{
      if (err) {
          console.error(err);
          return;
      }
      console.log('Data insert successful',res);
      client.end();
  })
  });
}) */
io.on('connection', (socket) => {
  console.log('usuario conectado', socket.id);
  socket.on('join_canal', (data) => {
    socket.join(data);
    console.log('user con id: ', socket.id, ' unido al canal: ', data);
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