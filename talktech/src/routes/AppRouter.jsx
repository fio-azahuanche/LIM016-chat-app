import { Routes, Route,BrowserRouter } from "react-router-dom";
import Login from '../components/Login';
import Canal from '../components/Canal';

function AppRouter() {

    return (
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/canal" element={<Canal />} />
    </Routes>
  </BrowserRouter>
 
        );
    }
    
    export default AppRouter;

