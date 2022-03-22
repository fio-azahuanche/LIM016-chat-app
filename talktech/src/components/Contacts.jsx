import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import io from 'socket.io-client';

const socket=io.connect("http://localhost:3001");

function Contacts() {
  /* const [listContacts, setlistContacts] = useState([]);
  
  useEffect(()=>{
    socket.on("receives_contact", (data) => {
      console.log('dataaa',data);
      setlistContacts((list)=>{
        return [...list,...data]
      })
    })
    console.log('Se montó contacts');
  }, []) */
  let listContacts = JSON.parse(sessionStorage.getItem('contactos'));

  let contactoAgregado = JSON.parse(sessionStorage.getItem('data'));
  if (contactoAgregado === null) {
    console.log('Entro al if');
    listContacts = JSON.parse(sessionStorage.getItem('contactos'));
  } else {
    listContacts.push(contactoAgregado);
  }
  console.log('contactoAgregado',contactoAgregado);
  console.log('listContacts',listContacts);
  return (
   
        <div className='pl-3 bg-pink'>
            <div className='sectionContact'>
              <div className='divContacts'>
              <ul> {listContacts.map((contact)=> {
                  return <li key={contact.id_contact} className='d-flex style-none pt-4 align-items-center'>
                    <img src={require('../assets/img1.png')} alt="" width='50' />
                    <h3 className='text-chat mx-2'>{contact.name_contact}</h3>
                    </li>
                } )}     
              </ul>
              </div>
                
            </div>
        </div>
  )
}

export default Contacts