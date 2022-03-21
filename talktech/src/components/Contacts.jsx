import React from 'react'

function Contacts() {

  function addContactModal(){
    const idModal = document.getElementById('miModal');
    idModal.setAttribute('class', 'show-modal');
  }

  const closeModal = () => {
    const idModal = document.getElementById('miModal');
    idModal.setAttribute('class', 'modal-success');
  }

  return (
   
        <div className='pl-3 bg-pink'>
        <nav class="navbar navbar-expand-lg navbar-dark">
          <img src={require('../assets/logo_talktech.png')} alt="" className='img-talktech'/>
            <a className="navbar-brand paddingNav" href="#">TalkTech</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link paddingNav" href="#">Perfil</a>
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
<nav class=" navbar-expand-lg navbar-dark pb-2">
  <div class="container-fluid">
    <div class="" id="navbarNav">
      <ul class="navbarChat ">
        <li class="nav-item">
          <a class="nav-link menu active" aria-current="page" href="#">Chats</a>
        </li>
        <li class="nav-item">
          <a class="nav-link menu" href="#">Contactos</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
            <div className='sectionContact'>
                <ul >
                    <li>Contact1</li>
                </ul>
            </div>
        </div>
  )
}

export default Contacts