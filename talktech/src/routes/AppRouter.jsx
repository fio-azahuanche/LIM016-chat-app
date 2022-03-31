import { Routes, Route,BrowserRouter } from "react-router-dom";
import Login from '../components/Login';
import SignUp from "../components/SignUp";

import DashboardRoutes from "./DashboardRoutes";
import Welcome from "../components/Welcome";

function AppRouter() {
  
 
    return (
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/userconfirm/:tokenup_user" element={<Welcome/>} />
      <Route path="/*" element={<DashboardRoutes/>}/>
    </Routes>
  </BrowserRouter>
 
        );
    }
    
    export default AppRouter;

