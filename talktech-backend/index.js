/* eslint-disable prettier/prettier */

const Server = require ('socket.io');

const express= require ('express');

const http = require ('http');

const cors = require ('cors');

const app = express();

const server=http.createServer(app);

const io =  Server(server)

app.use(cors());
app.use(express.static(__dirname,'./build'));

io.on('connection', () => {
        console.log('usuario conectado');

});
server.listen(5000, () => {
    console.log(`Servidor inicializado`)
})
