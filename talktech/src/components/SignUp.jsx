import React,{useEffect, useState} from 'react';
import validator from 'validator';
import io from 'socket.io-client';

const socket=io.connect("http://localhost:3001")

function SignUp() {
    // States for registration
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
 
    // Handling the form submission
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
        const userData={email,password,name}
            
        socket.emit("signup_user", userData);
        
            socket.on("recive_duplicate", (data) => {
                console.log(data);
                
            })
        setSubmitted(true);
        setError(false);
      }
    };

    // Showing success message
    const successMessage = () => {

    return (
     // <div style={{ display: submitted ? '' : 'none', }} >
<div  style={{display: submitted ? '' : 'none !important'}} class="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Aceptar</button>
      </div>
    </div>
  </div>
</div>
         //</div>
      );
    };

    // Showing error message if error is true
    const errorMessage = () => {
      return (
        <div
          className="alert alert-danger p-2" role="alert"
          style={{
            display: error ? '' : 'none',
          }}>
          <p className='m-0'>Por favor, verifique que todos los campos estén correctos.</p>
        </div>
      );
    };
    useEffect(() => {
      console.log("este es login",submitted);
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
          <button className="btn btn-primary" data-toggle="modal" data-target={submitted?'#exampleModalCenter':''} onClick={signupUser} >Registrar
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