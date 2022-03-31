import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import io from "socket.io-client";
import axios, { Axios } from "axios";

const url = "http://localhost:3002/users";
// const socket = io.connect("http://localhost:3001");

function SignUp() {
  const img_profile='https://firebasestorage.googleapis.com/v0/b/chat-app-dec86.appspot.com/o/imgPosts%2FdefaultProfile.png?alt=media&token=541bb97f-a649-4d4e-97e7-19a3b429c72b';
  const navigate = useNavigate();

  // * States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // * States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // * Handling the form submission
  const signupUser = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setError(true);
      setSubmitted(false);
    } else if (!validator.isEmail(email)) {
      setError(true);
      setSubmitted(false);
    } else {
      const userData = { email, password, name , verified: false, status: 'disconnect',imgProfile: img_profile};
      axios
        .post(url, userData)
        .then(function (res) {
          const response = res.data.status;
          if (response === 200) {
            const idModal = document.getElementById("miModal");
            idModal.setAttribute("class", "show-modal");
            setSubmitted(true);
            setError(false);
          } else {
            setSubmitted(false);
            setError(true);
          }
          console.log(res);
        })
        .catch(function (err) {
          setSubmitted(false);
          setError(true);
          console.log('este es el error ',err);
        });

      /* socket.emit("signup_user", userData);
        
        socket.on("receives_duplicate", (data) => {
                
          if(data==='Cuenta existente'){
            setSubmitted(false);
            setError(true);
            console.log(data);
          }else{
            const idModal = document.getElementById('miModal');
            idModal.setAttribute('class', 'show-modal');
            setSubmitted(true);
            setError(false);
            console.log(data);
          }
          
        }) */
    }
  };

  const sendToken = () => {
    axios.get()
  }

  const linkToLogin = () => {
    navigate("/");
  };

  const closeModal = () => {
    const idModal = document.getElementById("miModal");
    idModal.setAttribute("class", "modal-success");
    navigate("/");
  };

  // * Showing success message
  const successMessage = () => {
    return (
      <div id="miModal" className="modal-success">
        <div className="modal-contenido">
          <img src={require("../assets/check.gif")} alt="" className="gif" />
          <h5 className="h2Modal">Registro éxitoso!</h5>
          <p className="h2Modal">Revise su correo para validar.</p>
          <button className="btn btn-secondary" onClick={closeModal}>
            Cerrar
          </button>
        </div>
      </div>
    );
  };

  // * Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger p-2"
        role="alert"
        style={{
          display: error ? "" : "none",
        }}
      >
        <p className="m-0">Por favor, revise todos los campos.</p>
      </div>
    );
  };

  useEffect(() => {
    console.log("submitted", submitted);
  }, [submitted]);
  return (
    <section className="d-flex">
      <section className="portada">
        <div className="d-flex align-items-center justify-content-center m-4">
          <img src={require('../assets/logo_2.png')} alt="" className="imgLogo"/>
          <h2 className="text-center pt-4 pb-4 ml-2">TalkTech</h2>
        </div>
        <div className="slogan">
          <p className="p-0 m-0">Bienvenidx,</p>
          <p>Regístrate para la mejor experiencia de mensajería</p>
        </div>
        <div className="d-flex align-items-center line">
          <hr />
          <p className="link">www.talktech.com</p>
        </div>
      </section>
      <section className="mx-auto my-auto">
        <img src={require('../assets/lock.png')} alt="" className="lockLogo"/>
        <div className="container sectionLogin">
      <form className="m-3 mx-auto formulario">
        {/* Inputs for form data */}
        <div className="d-flex  flex-column pt-5 pb-4">
        <p id="pinkword" className="pinkword">Registro</p>
          <input
            className="form-control mx-auto inputLogin"
            type="text"
            placeholder="Ingrese nombre"
            onChange={(e) => {
              setName(e.target.value);
              setError(false)
            }}
            value={name}
          />

          <input
            className="form-control mt-4 mx-auto inputLogin"
            type="email"
            placeholder="Ingrese correo"
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false)
            }}
            value={email}
          />

          <input
            className="form-control mt-4 mx-auto inputLogin"
            type="password"
            placeholder="Ingrese contraseña"
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false)
            }}
            value={password}
          />
        </div>

        <div className="pb-5 d-flex justify-content-center">
          <button className="btn btnLogin" onClick={signupUser}>
            Registrarse
          </button>
        </div>
        <div className="text-center">
          <p className="pinkword">¿Ya tienes una cuenta? <span onClick={linkToLogin} className="linkContraseña">Iniciar Sesión</span></p>
        </div>
      </form>

      {/* Calling to the methods */}
      <div className="pb-5 d-flex justify-content-center">
        {errorMessage()}
        {successMessage()}
      </div>
    </div>
      </section>
      
    </section>
  );
}

export default SignUp;
