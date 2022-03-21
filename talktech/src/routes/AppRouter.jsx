import { Routes, Route,BrowserRouter } from "react-router-dom";
import Login from '../components/Login';
import Canal from '../components/Canal';
import SignUp from "../components/SignUp";
import Contacts from "../components/Contacts";

function AppRouter() {

    return (
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/canal" element={<Canal />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  </BrowserRouter>
 
        );
    }
    
    export default AppRouter;

