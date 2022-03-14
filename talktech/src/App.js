import React,{useState} from 'react';
import Chat from './components/Chat';
import io from 'socket.io-client';
import './App.css';
const socket=io.connect("http://localhost:3001")

function App() {

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

        <div className="App">
        {!showChat ? (
            <div className="joinChatContainer">
            <h3>Unirte al Chat</h3>
            <input
                type="text"
                placeholder="Tu nombre"
                onChange={(event) => {
                setUserName(event.target.value);
                }}
            />
            <input
                type="text"
                placeholder="Canal ID..."
                onChange={(event) => {
                setCanal(event.target.value);
                }}
            />
            <button onClick={joinCanal}>Unirte a un canal</button>
            </div>
        ) : (
            <Chat socket={socket} userName={userName} canal={canal} />
        )}
        </div>
    );
}

export default App;