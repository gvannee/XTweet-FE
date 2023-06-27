import { useContext, useState } from 'react';
import './login.scss'
import Register from '../register/Register';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [btnLogin, setBtnLogin] = useState(false)
    const { login } = useContext(AuthContext)
    const [err, setErr] = useState(null)
    const navigate = useNavigate()
    const user = {
        email: email,
        password: password,
    }

    const showRegister = (event) => {
       
            setRegister(!register);
            console.log("show register");
        
    }

    const changePassword = (event) => {
        setPassword(event.target.value)
        console.log(user);
    }

    const changeEmail = (event) => {
        setEmail(event.target.value)
        console.log(user);
    }

    const Login = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API}/login`, user, {
                withCredentials: true,
            })
            login();
            
        } catch (err) {
            console.log(err);
            setErr(err.response)
        }
  
        navigate("/")
    }


    return (
        <div className="login">
            <div className="card">
                <div className='left'>
                    <h1>Mewtweet</h1>
                    <p>
                        Mewtweet helps you connect and share cats with the people in your life.
                    </p>
                </div>
                <div className='right'>
                    <form>
                        <input type="text" placeholder='Email address' value={email} onChange={changeEmail} />
                        <input type='password' placeholder='Password' value={password} onChange={changePassword} />
                        {err && (<span style={{ color: "red", fontSize: "12px" }}>{err.message}</span>)}
                        <button className='btnLogin' disabled={!(email && password)}
                            onClick={Login}
                        >Login</button>
                    </form>
                    <a href='#'>Forgotten password?</a>
                    <button onClick={showRegister} className='btnRegister'>Create new account</button>
                </div>
            </div>
            {register ? (

                <Register />
            )
                : null
            }

        </div>
    )
}

export default Login;