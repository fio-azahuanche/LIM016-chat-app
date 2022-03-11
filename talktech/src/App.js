import React,{useState} from 'react';
import socket from './components/Socket';
// import axios from 'axios';
import './App.css';

function App() {
    socket.emit('conectado', 'Hola mundo desde el frontend uuuuuu');
    //const [nombre,setNombre]=useState('');

    return (

        <div className = "App" >
        Hola Mundo desde el frontend { ' ' }
        </div>

    );
}

export default App;