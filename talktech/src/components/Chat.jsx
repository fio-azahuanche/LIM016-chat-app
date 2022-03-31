import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import {v4 as uuid} from "uuid";


function Chat({ socket, canal ,setShowChat, nameCanal}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const userName=sessionStorage.getItem('name_user');
    const idUser = parseInt(sessionStorage.getItem('id_user'));
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const today=new Date();
            const messageData = {
                idMsg:uuid(),
                id_author: idUser,
                canal: canal,
                author: userName,
                message: currentMessage,
                time: today.toLocaleString("es-PE", {timeZone: "America/Lima"}),
            };
            console.log(messageData);
            await socket.emit('send_message', messageData);
            setMessageList((list)=>[...list,messageData]);
            setCurrentMessage("");
        };
    };
    const getHistory=()=>{
        const url=`http://localhost:3002/history/${canal}`
        axios.get(url).then((res)=>{
            const historial=res.data.map((item) => {
                console.log(typeof item.id_author);
                const messageData = {
                    idMsg: item.id_history,
                    id_author: item.id_author,
                    author: item.name_author,
                    message: item.message_history,
                    time: item.timezone.split('T').join(' ').slice(0,19)
                }
                return messageData
            })
            setMessageList(historial)
            console.log(res.data)
        }).catch((res)=>{
            console.log(res);
        })
        } 
    useEffect(()=>{
        return ()=>{
            setMessageList([])
        }
    },[])
    useEffect(()=>{
        getHistory()
    },[canal])
    
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList((list)=>[...list,data]);
        })
    }, [socket]);
    return (
        <div className="chat-window">
            <div className="chat-header d-flex justify-content-between align-items-center">
                <p>{nameCanal}</p>
                <i class='bx bx-arrow-back' onClick={()=>{setShowChat(false)}}></i>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => {
                    return (
                    <div className="message" key={messageContent.idMsg}
                        id={idUser === messageContent.id_author ? "other" : "you"}
                    >
                        <div>
                        <div className="message-content">
                            <p >{messageContent.message}</p>
                        </div>
                        <div className="message-meta pt-1 ">
                            <p className="colorUserName" id="time">{messageContent.time}</p>
                            <p className="colorUserName2" id="author">{messageContent.author}</p>
                        </div>
                        </div>
                    </div>
                    );
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                className="inputMessage"
                type="text"
                value={currentMessage}
                placeholder="Escribe aqui..."
                onChange={(event) => {
                    setCurrentMessage(event.target.value);
                }}
                onKeyPress={(event) => {
                    event.key === "Enter" && sendMessage();
                }}
                />
                <button   onClick={sendMessage}>&#9658;</button>
            </div>
            </div>
        );
    }


export default Chat
