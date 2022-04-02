import React,{useState} from 'react';
import Chat from './Chat';
import io from 'socket.io-client';
import '../App.css';
const socket=io.connect("http://localhost:3002")

function Canal() {

const [userName,setUserName]=useState("");
const [canal,setCanal]=useState("");
const [showChat,setShowChat]=useState(false);
const joinCanal=()=>{
if(userName!==""&&canal!==""){
    socket.emit("join_canal",canal);
    setShowChat(true);
    }
}
return (

        <div className="canal">
            {/* <img src={require('../assets/Vector1.png')} alt="" className="corner-one" /> */}
        {!showChat ? (
            <div className="joinChatContainer">
            <input
                className="form-control inputLogin "
                type="text"
                placeholder="Tu nombre"
                onChange={(event) => {
                setUserName(event.target.value);
                }}
            />
            <input
                className="form-control inputLogin my-3"
                type="text"
                placeholder="Canal ID..."
                onChange={(event) => {
                setCanal(event.target.value);
                }}
            />
            <button className="btn btnLogin" onClick={joinCanal}>Crear canal</button>
            </div>
        ) : (
            <Chat socket={socket} userName={userName} canal={canal} />
        )}
      {/*   <img src={require('../assets/Vector2.png')} alt="" className="corner-two"/>
 */}
        </div>
    );
}

export default Canal;