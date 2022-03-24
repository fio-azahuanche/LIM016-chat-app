import { Routes, Route,BrowserRouter } from "react-router-dom";
import Login from '../components/Login';
import SignUp from "../components/SignUp";
import { createContext, useContext } from "react";

import DashboardRoutes from "./DashboardRoutes";

function AppRouter() {
 
    return (
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/*" element={<DashboardRoutes/>}/>
    </Routes>
  </BrowserRouter>
 
        );
    }
    
    export default AppRouter;

