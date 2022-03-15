/* eslint-disable prettier/prettier */




 const {Server} = require ('socket.io');

const express= require ('express');

const app = express();

const http = require ('http');

const cors = require ('cors');

app.use(cors());

const server=http.createServer(app);

    const io = new Server(server,{
        cors:{
            origin:"http://localhost:3000",
            methods:["GET","POST"],
        }
    })




// app.use(express.static(__dirname,'./build'));

        io.on('connection', (socket) => {
        console.log('usuario conectado',socket.id);
        socket.on("join_canal",(data)=>{
            socket.join(data);
            console.log("user con id: ",socket.id," unido al canal: ",data);
        })

        socket.on("send_message",(data)=>{
        socket.to(data.canal).emit("receive_message",data)
        });

        socket.on("disconnect",() => {
            console.log("user desconectado",socket.id);
        });
        });
        server.listen(3001, () => {
            console.log(`Servidor inicializado`)
        })
