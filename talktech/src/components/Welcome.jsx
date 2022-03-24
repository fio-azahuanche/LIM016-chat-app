import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Welcome = (props) => {
    console.log(useLocation().pathname);
    const path = useLocation().pathname;
    const cutPath = path.slice(13)
        console.log('esto es cutPath', cutPath);
        axios.get("http://localhost:3002/users/confirm/" + cutPath).then((response) => {
            console.log(response);
            return response.data;
          });
    
    useEffect(()=>{
        console.log(path.toString());
    },[])
  
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Account confirmed!</strong>
          </h3>
        </header>
      </div>
    );
  };
  
  export default Welcome;