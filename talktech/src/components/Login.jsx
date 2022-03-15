import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const handleInicio = () => {
        navigate('/canal');
    }

    return (
        <section className="container sectionLogin">
            {/* <img src={require('../assets/Vector1.png')} alt="" className="corner-one" /> */}
            <div className="m-4">
                <h2 className="text-center pt-4 pb-4">TalkTech</h2>
            </div>
            <div className="divLogin m-3 mx-auto">
                <div className="d-flex  flex-column pt-5 pb-4">
                    <input className="form-control w-75 mx-auto inputLogin" type="text" placeholder="Ingrese correo" />
                    <input className="form-control mt-4 w-75  mx-auto inputLogin" type="password" placeholder="Ingrese contraseña" />
                    <a href="/" className="mt-3 mx-auto  linkContraseña">¿Olvidaste la contraseña?</a>
                </div>
                <div className="pb-5 d-flex justify-content-center">
                    <button className="btn btnLogin" onClick={handleInicio}>Iniciar Sesión</button>
                </div>
            </div>
            {/* <img src={require('../assets/Vector2.png')} alt="" className="corner-two"/> */}
        </section>
    )
}
export default Login