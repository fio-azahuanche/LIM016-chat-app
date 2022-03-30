import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import io from 'socket.io-client';
import axios from "axios";
import Chat from './Chat';

const socket=io.connect("http://localhost:3001")

function Contacts() {

  const idUser = sessionStorage.getItem('id_user');
  const url2 = `http://localhost:3002/contact/${idUser}`

  const [listContacts, setlistContacts] = useState([]);
  
  const [showChat,setShowChat]=useState(false);
  const [currentCanal, setCurrentCanal] = useState('')

  const getContacts = ()=>{
    axios.get(url2)
    .then(function (res) {
      console.log('esta es la res',res );
      setlistContacts(res.data)
    })
    .catch(function (err) {
      console.log("este es el error ", err);
    });
  }

  const joinCanal=(canal)=>{
    //const canal =e.target.id
    console.log(canal);
        socket.emit("join_canal",canal);
        setShowChat(true);
        setCurrentCanal(canal)
    }

  useEffect(()=>{
    getContacts();
  }, [])

  return (
   
        <div className='pl-3 bg-pink bodyNav'>  
          <div className='sectionContact position-relative'>
            <div className='divContacts'>
            <ul> {listContacts.map((contact)=> {
                return <li key={contact.id_user} onClick={()=>joinCanal(contact.id_channel)} className='d-flex style-none pt-4 align-items-center'>
                  <img src={require('../assets/img1.png')} alt="" width='50' />
                  <h3 className='text-chat mx-2'>{contact.name_user}</h3>
                  </li>
              } )} 
              
            </ul>
            </div>
            <div className='modal-chat bg-pink'>
              {showChat && (<Chat socket={socket} canal={currentCanal} setShowChat={setShowChat}/>)}
            </div>
            </div>
        

        </div>
  )
}

export default Contacts