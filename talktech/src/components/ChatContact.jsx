import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { io } from 'socket.io-client';
import Chat from './Chat';
const socket=io.connect("http://localhost:3001")
function ChatContact() {
  const idUser = sessionStorage.getItem('id_user');
  const url2 = `http://localhost:3002/canals/${idUser}`

  const [channels, setChannel ] = useState([]);
  const [showChat,setShowChat]=useState(false);
  const [currentCanal, setCurrentCanal] = useState('')

  const getChannels =()=>{
    axios.get(url2).then((res)=>{
      const id_contacts=res.data.map((item)=>{
        return item.integrantes.filter((it)=>it!==parseInt(idUser))[0]
      });
      id_contacts.forEach((item,index) =>{
        axios.get(`http://localhost:3002/users/${item}`).then((response)=>{
          setChannel((list)=>{
            return [...list,
              {id_canal:res.data[index].id_canal,
              nameContact:response.data[0].name_user,
              id_contact:id_contacts[index]}
            ]
          });
          console.log(response);
        })
      })
      console.log(id_contacts);
    }).catch((res)=>{
      console.log(res)
    })
  }

  const joinCanal=(e)=>{
    const canal =e.target.id
    console.log(canal);
        socket.emit("join_canal",canal);
        setShowChat(true);
        setCurrentCanal(canal)
    }

  useEffect(()=>{
    getChannels()
  },[])
  return (
    <div className='pl-3 bg-pink'>
        {!showChat ? (
            <div className='sectionContact'>
            <div className='divContacts'>
            {channels.map((item)=>{
              return <div key={item.id_contact} id={item.id_canal} onClick={joinCanal}>{item.nameContact}</div>
            })}
            </div>
              
          </div>
        ) : (
            <Chat socket={socket} canal={currentCanal} setShowChat={setShowChat}/>
        )}

            
        </div>
  )
}

export default ChatContact