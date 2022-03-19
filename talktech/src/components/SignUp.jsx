import React,{useState} from 'react';
import validator from 'validator';

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
      }
      else if (!validator.isEmail(email)) {
        setError(true);
      } else {
        setSubmitted(true);
        setError(false);
      }
    };

    // Showing success message
    const successMessage = () => {
    return (
      <div
        className="alert alert-success p-2" role="alert"
          style={{
            display: submitted ? '' : 'none',
          }}>
            
          <p className='m-0'>Te registraste con éxito!!</p>
        </div>
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
    return (
      <div className="container sectionLogin">
 
      <form className="divLogin m-3 mx-auto">
        {/* Inputs for form data */}
        <div className="d-flex  flex-column pt-5 pb-4">
          <input className="form-control w-75 mx-auto inputLogin" type="text" placeholder="Ingrese nombre" onChange={(e) => { setName(e.target.value); setSubmitted(false); }} value={name} />
 
          <input className="form-control mt-4 w-75  mx-auto inputLogin" type="email" placeholder="Ingrese correo" onChange={(e) => { setEmail(e.target.value); setSubmitted(false); }} value={email} />

          <input className="form-control mt-4 w-75 mx-auto inputLogin" type="password" placeholder="Ingrese contraseña" onChange={(e) => { setPassword(e.target.value); setSubmitted(false); }} value={password} />
        </div>
        
        <div className="pb-5 d-flex justify-content-center">
          <button onClick={signupUser} className="btn btnLogin" type="submit">Registrar
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