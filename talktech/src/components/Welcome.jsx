import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Welcome = (props) => {
        console.log(useLocation().pathname);
        const path=useLocation().pathname
    /* if (props.match.path === "/userconfirm/:confirmationCode") {
console.log(props.match.path);
        axios.get("http://localhost:3002/users/confirm/" + props.match.params.confirmationCode).then((response) => {
            console.log(response);
            return response.data;
          });
    } */
    useEffect(()=>{
        console.log(path);
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