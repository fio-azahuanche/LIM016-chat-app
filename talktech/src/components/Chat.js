import React,{useState} from 'react';

function Chat({socket,userName,canal}) {
    const [currentMessage,setCurrentMessage]=useState("");
  const sendMessage= async ()=>{
      if (currentMessage!=="") {
          const messageData={
              canal:canal,
              author:userName,
              message:currentMessage,
              time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
          };
          await socket.emit('send_message',messageData);
      }
  }
  
    return (
    <div>
        <div>
            <p> Chatea </p>
        </div>
        <div>
            <input type="text" placeholder="Escribe aqui ..." onChange={(event)=>{
        setCurrentMessage(event.target.value);
                }
            } 
        />
            <button onClick={sendMessage}>Enviar</button>
        </div>
    </div>
  )
}

export default Chat