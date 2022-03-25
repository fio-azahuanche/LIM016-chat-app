import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001")

function NavBar() {
  const [prueba, setPrueba] = useState([]);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  function addContactModal(){
    const idModal = document.getElementById('miModal');
    idModal.setAttribute('class', 'show-modal');
  }

  const closeModal = () => {
    const idModal = document.getElementById('miModal');
    idModal.setAttribute('class', 'modal-success');
  }

  const routerProfile = ()=>{
    navigate('/profile');
  }
  const routerCanal = ()=>{
    navigate('/canal');
  }
  const addNewContact = () => {
    const idUser =sessionStorage.getItem('id_user')
    const userEmail = { email , idUser  } 
    /* socket.emit("add_contact", userEmail);
    socket.on("receives_contact1", (data) => {
      console.log('dataaa',data);
      sessionStorage.setItem('data', JSON.stringify(data));
    }) */
  }

  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-dark bg-pink">
          <img src={require('../assets/logo_talktech.png')} alt="" className='img-talktech'/>
            <a className="navbar-brand paddingNav" href="#">TalkTech</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link paddingNav" onClick={routerProfile}>Perfil</a>
      </li>
      <li class="nav-item">
        <a className="nav-link paddingNav" onClick={addContactModal}>Agregar Contacto</a>
        <div id="miModal" className="modal-success">    
        <div  className="modal-contact">
          <input type="email" className='form-control' placeholder='Ingrese correo' onChange={(e) => { setEmail(e.target.value); }} value={email}/>
          <div className='d-flex'>
            <button className='btn btn-secondary m-3' onClick={closeModal} >Cerrar</button>
            <button className='btn btn-success m-3' onClick={addNewContact} >Añadir</button>
          </div>
          
        </div>
      </div>
      </li>
      <li class="nav-item">
        <a class="nav-link paddingNav" href="#" onClick={routerCanal}>Crear Canal</a>
      </li>
      <li class="nav-item">
        <a class="nav-link paddingNav" href="#">Cerrar Sesión</a>
      </li>
    </ul>
  </div>
</nav>
<nav class=" navbar-expand-lg navbar-dark pb-2 bg-pink">
  <div class="container-fluid">
    <div class="" id="navbarNav">
      <ul class="navbarChat ">
      <li class="nav-item">
          <NavLink className="style-none active" aria-current="page" to="/chat-contact"><a class="nav-link text-white style-none" href="">Chats</a></NavLink>
        </li>
        <li class="nav-item">
          <NavLink className="style-none" to="/contacts"><a class="nav-link text-white style-none" href="">Contactos</a></NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
</>
  )
}

export default NavBar