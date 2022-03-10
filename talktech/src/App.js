import React from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  //const prueba = () => {
    axios.get('http://localhost:5000/').then(
      (datos)=>{
        console.log(datos);
      }
    );
    
    //return datos;
  //}
  //prueba();
  return (
    <div className="App">
      Hola Mundo desde el frontend
    </div>
  );
}

export default App;
