import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
// import io from 'socket.io-client';

const url = "http://localhost:3002/contact"

function NavBar() {
  const [prueba, setPrueba] = useState(false);
  const [email, setEmail] = useState("");

  function addContactModal(){
    const idModal = document.getElementById('miModal');
    idModal.setAttribute('class', 'show-modal');
  }

  const closeModal = () => {
    const idModal = document.getElementById('miModal');
    idModal.setAttribute('class', 'modal-success');
  }
  const removeData = () => {
    sessionStorage.clear()
  }

  const addNewContact = () => {
    const idUser =sessionStorage.getItem('id_user')
    console.log(idUser);
    const userEmail = { email_contact:email , id_user:idUser  } 
    axios.post(url, userEmail).then((res)=>{
      console.log(res);   
      window.location.reload()

    }).catch((res)=>{
      console.log(res);
      setPrueba(true)

    })
    console.log(userEmail);
    /* socket.emit("add_contact", userEmail);
    socket.on("receives_contact1", (data) => {
      console.log('dataaa',data);
      sessionStorage.setItem('data', JSON.stringify(data));
    }) */
  }

  return (<>
    <div className='pruebaaaa'>
    <nav className="navbar position-absolute z100 w-100 minHeight navbar-expand-lg navbar-dark bg-purple p-0">
          <img src={require('../assets/logo_talktech.png')} alt="" className='img-talktech'/>
            <NavLink className="navbar-brand paddingNav" to="/chat-contact">TalkTech</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <NavLink className="nav-link paddingNav" to='/profile'>Perfil</NavLink>
      </li>
      <li className="nav-item">
        <a className="nav-link paddingNav" onClick={addContactModal}>Agregar Contacto</a>
        <div id="miModal" className="modal-success">    
        <div  className="modal-contact">
          <input type="email" className='form-control' placeholder='Ingrese correo' onChange={(e) => { setEmail(e.target.value);setPrueba(false); }} value={email}/>
          {(prueba===true)&&<span>Error encontrado</span>}
          <div className='d-flex'>
            <button className='btn btn-secondary m-3' onClick={closeModal} >Cerrar</button>
            <button className='btn btn-success m-3' onClick={addNewContact} >Añadir</button>
          </div>
          
        </div>
      </div>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link paddingNav" to="/canal">Crear Canal</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link paddingNav" to="/" onClick={removeData}>Cerrar Sesión</NavLink>
      </li>
    </ul>
  </div>
</nav>
</div>
<nav className=" navbar-expand-lg navbar-dark bg-purple nav-responsive" style={{height:'7vh'}}>
  <div className="container-fluid">
    <div className="" id="navbarNav">
      <ul className="navbarChat ">
      <li className="nav-item">
          <NavLink className="style-none active nav-link text-white" aria-current="page" to="/chat-contact">Chats</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="style-none nav-link text-white" to="/contacts">Contactos</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </>)
}

export default NavBar