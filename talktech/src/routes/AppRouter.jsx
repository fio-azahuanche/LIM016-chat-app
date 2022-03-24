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
<<<<<<< HEAD
      <Route path="/canal" element={<Canal />}/>
=======
      <Route path="/*" element={<DashboardRoutes/>}/>
>>>>>>> 2236f08413c2f53c6a862aa032eebb966315aeaf
    </Routes>
  </BrowserRouter>
 
        );
    }
    
    export default AppRouter;

