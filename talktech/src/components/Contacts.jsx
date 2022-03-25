import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import io from 'socket.io-client';
import axios from "axios";

function Contacts() {

  const idUser = sessionStorage.getItem('id_user');
  const url2 = `http://localhost:3002/contacts/${idUser}`

  const [listContacts, setlistContacts] = useState([]);
 
  const getContacts = ()=>{
    axios.get(url2)
    .then(function (res) {
      console.log('esta es la res',res );
    })
    .catch(function (err) {
      console.log("este es el error ", err);
    });
  }
  useEffect(()=>{
    getContacts();
  }, [])

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