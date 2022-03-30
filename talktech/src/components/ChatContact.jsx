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

  const getDataIntegrantes = (arrayIdIntegrantes) => {
    const newArray = arrayIdIntegrantes.map((id) => axios.get(`http://localhost:3002/users/${id}`)
      .then((response) => {
        const newObject = {
          nameContact:response.data[0].name_user,
          id_contact:id
        };
        return newObject;
      }));
    return Promise.all(newArray);
  };


  const getChannels =()=>{
    axios.get(url2).then((res)=>{

      const id_contacts=res.data.map((item)=>{
        console.log(item.integrantes);
        return item.integrantes.filter((it)=>it!==parseInt(idUser))[0]
      });
      getDataIntegrantes(id_contacts).then((response)=>{
        setChannel((list)=>{
          const newList=response.map((el,index)=>({...el,id_canal:res.data[index].id_channel}))
          console.log(newList);
          return [...newList]
        });
      });

      /* id_contacts.forEach((item,index) =>{
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
      }) */
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
    <div className='pl-3 bg-pink w-100 bodyNav'>
      <div className='sectionContact position-relative'> 
        <div className='divContacts'>
        {channels.map((item)=>{
          return <><div key={item.id_contact} className='d-flex' onClick={()=>joinCanal(item.id_canal)}>
                    <img src={require('../assets/img1.png')} alt="" width='50' />
                    <h3 className='text-chat mx-2'>{item.nameContact}</h3>
                  </div>
                  <hr/></>
        })}
        </div>
        <div className='modal-chat bg-pink'>
          {showChat && (<Chat socket={socket} canal={currentCanal} setShowChat={setShowChat}/>)}  
        </div>
              
      </div>
    </div>
  )
}

export default ChatContact