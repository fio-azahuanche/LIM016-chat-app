import React,{useState} from 'react';
import Chat from './components/Chat';
import io from 'socket.io-client';
import './App.css';
const socket=io.connect("http://localhost:3001")

function App() {

const [userName,setUserName]=useState("");
const [canal,setCanal]=useState("");
const joinCanal=()=>{
if(userName!==""&&canal!==""){
    socket.emit("join_canal",canal)
    }
}
return (

    <div className = "App" >
       <h4>TalkTech</h4>
        <input type="text" placeholder="Nombre" onChange={(event)=>{
        setUserName(event.target.value);
                }
            }
        />
    <input type="text" placeholder="CanalId" onChange={(event)=>{
    setCanal(event.target.value);
            }
        }
    />
    <button onClick={joinCanal}>chatear</button>
    <Chat socket={socket} userName={userName} canal={canal}/>
    </div>
    );
}

export default App;