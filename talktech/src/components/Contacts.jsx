import React from 'react'
import { useNavigate } from 'react-router-dom';

function Contacts() {
  
  return (
   
        <div className='pl-3 bg-pink'>
        
<nav class=" navbar-expand-lg navbar-dark pb-2 bg-pink">
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