import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import {v4 as uuid} from "uuid";


function Chat({ socket, canal ,setShowChat}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const userName=sessionStorage.getItem('name_user');
    const idUser = parseInt(sessionStorage.getItem('id_user'));
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                id: idUser,
                canal: canal,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getFullYear() + "-" + (new Date(Date.now()).getMonth() + 1) + "-" + new Date(Date.now()).getDate() + " " + new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds(),
            };
           // console.log(messageData);
            console.log(typeof idUser);
            
            await socket.emit('send_message', messageData);
            setMessageList((list)=>[...list,messageData]);
            setCurrentMessage("");
        };
    };
   const getHistory=()=>{
    const url=`http://localhost:3002/history/${canal}`
    axios.get(url).then((res)=>{
        res.data.map((item) => {
            console.log(typeof item.id_user);
            const messageData = {
                idMsg: item.id_history,
                id: item.id_user,
                author: item.id_user,
                message: item.message_history,
                time: item.date_history,
            };
            setMessageList((list)=>[...list,messageData]);
        })
        
        console.log(res.data)
    }).catch((res)=>{
        console.log(res);
    })
    } 

    useEffect(()=>{
        getHistory()
        return ()=>{
            setMessageList([])
        }
    },[])

    useEffect(() => {
        
        socket.on("receive_message", (data) => {
            setMessageList((list)=>[...list,data]);
        })
    }, [socket]);
    return (
        <div className="chat-window">
            <i class='bx bx-arrow-back' onClick={()=>{setShowChat(false)}}></i>
            <div className="chat-header">
                <p>TalkTech</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => {
                    return (
                    <div className="message" key={messageContent.idMsg}
                        id={idUser === parseInt(messageContent.id) ? "other" : "you"}
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
