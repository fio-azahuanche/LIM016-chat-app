import React, { useState, useEffect } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import {v4 as uuid} from "uuid";

function Chat({ socket, canal ,setShowChat}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const userName=sessionStorage.getItem('name_user');
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                id: sessionStorage.getItem('id_user'),
                canal: canal,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit('send_message', messageData);
            setMessageList((list)=>[...list,messageData]);
            setCurrentMessage("");
        };
    };
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
                    <div className="message" key={messageContent.id}
                        id={userName === messageContent.author ? "other" : "you"}
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
