import React from 'react'
import { useNavigate } from 'react-router-dom';

function NavBar() {
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

  return (
      
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
          <input type="text" className='form-control' placeholder='Ingrese correo'/>
          <div className='d-flex'>
            <button className='btn btn-secondary m-3' onClick={closeModal} >Cerrar</button>
            <button className='btn btn-success m-3' onClick={closeModal} >Añadir</button>
          </div>
          
        </div>
      </div>
      </li>
      <li class="nav-item">
        <a class="nav-link paddingNav" href="#">Crear Canal</a>
      </li>
      <li class="nav-item">
        <a class="nav-link paddingNav" href="#">Cerrar Sesión</a>
      </li>
    </ul>
  </div>
</nav>
  )
}

export default NavBar