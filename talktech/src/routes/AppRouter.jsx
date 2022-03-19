import { Routes, Route,BrowserRouter } from "react-router-dom";
import Login from '../components/Login';
import Canal from '../components/Canal';
import SignUp from "../components/SignUp";

function AppRouter() {

    return (
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/canal" element={<Canal />} />
    </Routes>
  </BrowserRouter>
 
        );
    }
    
    export default AppRouter;

