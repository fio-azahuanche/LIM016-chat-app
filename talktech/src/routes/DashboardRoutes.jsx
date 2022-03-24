import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Canal from '../components/Canal';
import NavBar from '../components/NavBar'
import Contacts from "../components/Contacts";
import Profile from "../components/Profile";
import ChatContact from '../components/ChatContact';

function DashboardRoutes() {
 
  return (
    <div>
        <NavBar/>
        <Routes>
            <Route path="canal" element={<Canal />} />
            <Route path="contacts" element={<Contacts/>} />
            <Route path="profile" element={<Profile />} />
            <Route path="chat-contact" element={<ChatContact />} />
        </Routes>
    </div>
  )
}

export default DashboardRoutes