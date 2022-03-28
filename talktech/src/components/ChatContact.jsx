import axios from 'axios';
import React, { useEffect, useState } from 'react'
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
        const newIntegrantes=item.integrantes.split(',').map(el => parseInt(el));
        console.log(newIntegrantes);
        return newIntegrantes.filter((it)=>it!==parseInt(idUser))[0]
      });
      console.log(id_contacts);
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
    }).catch((res)=>{
      console.log(res)
    })
  }

  const joinCanal=(canal)=>{
    console.log(canal);
        socket.emit("join_canal",canal);
        setShowChat(true);
        setCurrentCanal(canal)
    }

  useEffect(()=>{
    getChannels()
    return ()=>{
      setChannel([])
    }
  },[])
  return (
    <div className='pl-3 bg-pink'>
        {!showChat ? (
            <div className='sectionContact'> 
            <div className='divContacts'>
            {channels.map((item)=>{
              return <div key={item.id_contact} onClick={()=>joinCanal(item.id_canal)}>{item.nameContact}</div>
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