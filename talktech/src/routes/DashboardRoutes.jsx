import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Canal from '../components/Canal';
import NavBar from '../components/NavBar'
import Contacts from "../components/Contacts";
import Profile from "../components/Profile";
import ChatContact from '../components/ChatContact';
import io from 'socket.io-client';

const socket=io.connect("http://localhost:3001");

function DashboardRoutes() {
  const [prueba, setPrueba] = useState([]);
  return (
    <div>
        <NavBar setPrueba={setPrueba}/>
        <Routes>
            <Route path="canal" element={<Canal />} />
            <Route path="contacts" element={<Contacts socket={prueba} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="chat-contact" element={<ChatContact />} />
        </Routes>
    </div>
  )
}

export default DashboardRoutes