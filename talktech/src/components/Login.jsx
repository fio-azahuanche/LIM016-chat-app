import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Canal from './Canal';
import io from 'socket.io-client';
import '../App.css';
const socket=io.connect("http://localhost:3001")
const userLoggued = React.createContext({});

function Login() {
    const navigate = useNavigate();
    /* const handleInicio = () => {
      navigate('/canal');
    } */
    const [emailUser, setEmailUser] = useState("");
    const [password, setPassword] = useState("");
    // no deberia existir una variable de estado login, pues al darle click al boton login
    // y si es correcta el email y contraseña cambiaria de ruta a /canal, ya no estariamos en la vista de login
    // es decir el componente login ya no estaria en pantalla 
    const [login, setLogin] = useState([]);

    const loginUser = () => {
        if (emailUser !== "" && password !== "") {
            const userData={email:emailUser,password:password,token:''}
            socket.emit("login_user", userData);
            
            socket.on("receive_token", (data) => {
                //para usar lo de la linea 30 la variable de estado login no deberia de existir y solo la data se guarda en el locastorage
                setLogin(data);
            })

            //navigate('/canal');
        }
        
    }


    /* useEffect(() => {
        socket.on("receive_login", (data) => {
            setLogin((list)=>[...list,data]);
            console.log("este es login",data);
        })
    }, []); */
   
    useEffect(() => {
        console.log("este es login",login);
    }, [login]);
   
    return (
        <section className="container sectionLogin">
            {/* no se necesita poner una condicional en la variable de estado login(si es que esta llegase a existir) porque todo
            el return contiene al componente login que solo pertenece a la ruta /login */}
        {login.length===0 ? (
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
             ) : (
                 <div></div>
                )}
        </section>
       
    )
}
export default Login