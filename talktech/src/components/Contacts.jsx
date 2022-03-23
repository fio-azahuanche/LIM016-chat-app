import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import io from 'socket.io-client';


function Contacts() {
  const [listContacts, setlistContacts] = useState([]);
  
  const prueba = async () => {
    const socket=io.connect("http://localhost:3001");
    await socket.on("receives_contact", (data) => {
      console.log('dataaa',data);
      setlistContacts((list)=>{
        return [...list,...data]
      })
    })
  }
  useEffect(()=>{
    prueba();
    console.log('Se montó contacts');
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