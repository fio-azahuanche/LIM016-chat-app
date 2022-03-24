import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import '../App.css';
const socket=io.connect("http://localhost:3001")
const userLoggued = React.createContext({});

function Login() {
    const navigate = useNavigate();
   
    const [emailUser, setEmailUser] = useState("");
    const [password, setPassword] = useState("");
    

    const loginUser = () => {
        if (emailUser !== "" && password !== "") {
            const userData={email:emailUser,password:password,token:''}
            socket.emit("login_user", userData);
            
            socket.on("receive_token", (data) => {
                console.log(data);
                sessionStorage.setItem('name_user', data.userData.name_user );
                sessionStorage.setItem('email_user', data.userData.email_user ); 
                sessionStorage.setItem('id_user', data.userData.id_user );                
            })
            socket.on("receives_contacts", (data) => {
                console.log(data);
                sessionStorage.setItem('contactos', JSON.stringify(data) );              
            })
            navigate('/chat-contact');
        }
        
    }
   
    return (
        <section className="container sectionLogin">
            <div>
            <div className="m-4">
                <h2 className="text-center pt-4 pb-4">TalkTech</h2>
            </div>
            <div className="divLogin m-3 mx-auto">
                <div className="d-flex  flex-column pt-5 pb-4">
                    <input className="form-control w-75 mx-auto inputLogin" type="text" placeholder="Ingrese correo" onChange={(event) => {
                setEmailUser(event.target.value);
                }} />
                    <input className="form-control mt-4 w-75  mx-auto inputLogin" type="password" placeholder="Ingrese contraseña" onChange={(event) => {
                setPassword(event.target.value);
                }} />
                    <a href="/" className="mt-3 mx-auto  linkContraseña">¿Olvidaste la contraseña?</a>
                </div>
                <div className="pb-5 d-flex justify-content-center">
                    <button className="btn btnLogin" onClick={loginUser}>Iniciar Sesión</button>
                </div>
            </div>
            </div>
        </section>
       
    )
}
export default Login