import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "../App.css";
const socket = io.connect("http://localhost:3001");
const userLoggued = React.createContext({});

const url = "http://localhost:3002/users/login";

function Login() {
  const navigate = useNavigate();

  const [emailUser, setEmailUser] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    console.log('click');
    if (emailUser !== "" && password !== "") {
      const userData = { email: emailUser, password: password };

      axios
        .post(url, userData)
        .then(function (res) {
          const response = res.status;

          if (response === 200) {
            sessionStorage.setItem('name_user', res.data.dataUser.name );
            sessionStorage.setItem('email_user', res.data.dataUser.email ); 
            sessionStorage.setItem('id_user', res.data.dataUser.id );
            sessionStorage.setItem('img_profile', res.data.dataUser.imgProfile );
            navigate("/chat-contact"); 
          } 
          console.log('esta es la res',res );
        })
        .catch(function (err) {
          // ver los errores contraseña incorrecta, no confirmo email, no registrado
          // que se traiga del login del backend
          console.log("este es el error ", err);
        });
      /* socket.emit("login_user", userData);
            
            socket.on("receive_token", (data) => {
                console.log(data);
                sessionStorage.setItem('name_user', data.userData.name_user );
                sessionStorage.setItem('email_user', data.userData.email_user ); 
                sessionStorage.setItem('id_user', data.userData.id_user );                
            })
            socket.on("receives_contacts", (data) => {
                console.log(data);
                sessionStorage.setItem('contactos', JSON.stringify(data) );              
            }) */
    }
  };
  const linkToSignup = () => {
    navigate("/signup");
  };
  
  return (
    <section className="d-flex">
      <section className="portada">
        <div className="d-flex align-items-center justify-content-center m-4">
          <img src={require('../assets/logo_2.png')} alt="" className="imgLogo"/>
          <h2 className="text-center pt-4 pb-4 ml-2">TalkTech</h2>
        </div>
        <div className="slogan">
          <p className="p-0 m-0">Bienvenidx,</p>
          <p>Inicia sesión para la mejor experiencia de mensajería</p>
        </div>
        <div className="d-flex align-items-center line">
          <hr />
          <p className="link">www.talktech.com</p>
        </div>
      </section>
      <section className="divLogin mx-auto my-auto">
        <div className="d-flex align-items-center justify-content-center m-4 title">
          <img src={require('../assets/logo_2.png')} alt="" className="imgLogo"/>
          <h2 className="text-center pt-4 pb-4 ml-2">TalkTech</h2>
        </div>
        <img src={require('../assets/lock.png')} alt="" className="lockLogo"/>
        <div className="m-3 mx-auto formulario">
          <div className="d-flex  flex-column pt-5 pb-4">
            <p id="pinkword" className="pinkword">Inicio Sesión</p>
            <input
              className="form-control mx-auto inputLogin"
              type="text"
              placeholder="Ingrese correo"
              onChange={(event) => {
                setEmailUser(event.target.value);
              }}
            />
            <input
              className="form-control mt-4 mx-auto inputLogin"
              type="password"
              placeholder="Ingrese contraseña"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <a href="/" className="mt-3 mx-auto linkContraseña">
              ¿Olvidaste la contraseña?
            </a>
          </div>
          <div className="pb-5 d-flex justify-content-center">
            <button className="btn btnLogin" onClick={loginUser}>
              Ingresar
            </button>
          </div>
          <div className="text-center">
          <p className="pinkword">¿No tienes una cuenta? <span onClick={linkToSignup} className="linkContraseña">Regístrate</span></p>
          </div>
          
        </div>
      </section>
      
    </section>
  );
}
export default Login;
