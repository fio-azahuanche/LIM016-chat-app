import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import io from 'socket.io-client';

const socket=io.connect("http://localhost:3001")

function SignUp() {
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
      if (name === '' || email === '' || password === '') {
        setError(true);
        setSubmitted(false);
      }
      else if (!validator.isEmail(email)) {
        setError(true);
        setSubmitted(false);
      } else {
        const userData = { email, password, name } 
        socket.emit("signup_user", userData);
        
        socket.on("receives_duplicate", (data) => {
                
          if(data==='Cuenta existente'){
            setSubmitted(false);
            setError(true);
          }else{
            const idModal = document.getElementById('miModal');
            idModal.setAttribute('class', 'show-modal');
            setSubmitted(true);
            setError(false);
            console.log(data);
          }
          
        })
        
      }
    };

    const closeModal = () => {
      const idModal = document.getElementById('miModal');
      idModal.setAttribute('class', 'modal-success');
      navigate('/');
    }

    // * Showing success message
    const successMessage = () => {

    return (
      <div id="miModal" className="modal-success">    
        <div  className="modal-contenido">
          <img src={require('../assets/check.gif')} alt="" className='gif' />
          <h5 className="h2Modal">Registro éxitoso!</h5>
          <p className="h2Modal">Revise su correo para validar.</p>
          <button className='btn btn-secondary' onClick={closeModal}>Cerrar</button>
        </div>
      </div>


      );
    };

    // * Showing error message if error is true
    const errorMessage = () => {
      return (
        <div
          className="alert alert-danger p-2" role="alert"
          style={{
            display: error ? '' : 'none',
          }}>
          <p className='m-0'>Por favor, revise todos los campos.</p>
        </div>
      );
    };

    useEffect(() => {
      console.log("submitted",submitted);
  }, [submitted]);
    return (
      <div className="container sectionLogin">
 
      <form className="divLogin m-3 mx-auto">
        {/* Inputs for form data */}
        <div className="d-flex  flex-column pt-5 pb-4">
          <input className="form-control w-75 mx-auto inputLogin" type="text" placeholder="Ingrese nombre" onChange={(e) => { setName(e.target.value); }} value={name} />
 
          <input className="form-control mt-4 w-75  mx-auto inputLogin" type="email" placeholder="Ingrese correo" onChange={(e) => { setEmail(e.target.value); }} value={email} />

          <input className="form-control mt-4 w-75 mx-auto inputLogin" type="password" placeholder="Ingrese contraseña" onChange={(e) => { setPassword(e.target.value); }} value={password} />
        </div>
        
        <div className="pb-5 d-flex justify-content-center">
          <button className="btn btnLogin" onClick={signupUser} >Registrar
          </button>
        </div>
        
      </form>

      {/* Calling to the methods */}
      <div className="pb-5 d-flex justify-content-center">
        {errorMessage()}
        {successMessage()}
      </div>
    </div>
  )
}

export default SignUp