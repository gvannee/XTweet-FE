import './register.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

const Register = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(true)

    //create user data 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [err, setErr] = useState(null);


    const month = date.toLocaleString("en-us", { month: "long" });
    const day = date.toLocaleString("en-us", { day: "2-digit" });
    const year = date.getFullYear();
    const dob = month + " " + day + " " + year

    const user = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        phone: phone,
        dob: dob
    }

    const changeEmail = (event) => {
        setEmail(event.target.value)
    }

    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    const changeFirstName = (event) => {
        setFirstName(event.target.value)
    }

    const changeLastName = (event) => {
        setLastName(event.target.value)
    }

    const changePhone = (event) => {
        setPhone(event.target.value)
    }

    const close = (event) => {
        
            setShow(!show);
        
    }

    const changeDate = (event) => {
        setDate(event);
        console.log(user);
    }

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_API}/register`, user);
            close()
        } catch (err) {
            console.log(err);
            setErr(err.response)
        }

    }


    return (
        <>
            {show ? (
                <div className="register">
                    <div className="card">

                        <div className='right'>

                            <div className='title'>
                                <div className='leftTitle'>
                                    <h1>Sign Up</h1>
                                    <p>It's quick and easy.</p>
                                </div>
                                <FontAwesomeIcon icon={faXmark} onClick={close} className='icon' />
                            </div>

                            <form>
                                <div className='name' >
                                    <input type="text" placeholder='First name' value={firstName} onChange={changeFirstName} />
                                    <input type="text" placeholder='Last name' value={lastName} onChange={changeLastName} />
                                </div>
                                <input type="text" placeholder='Email address' value={email} onChange={changeEmail} />
                                <input type="text" placeholder='Phone number' value={phone} onChange={changePhone} />
                                <input type='password' placeholder='Password' value={password} onChange={changePassword} />
                                <div className='dob'>
                                    <div className='type'>
                                        <h5>Date of birth</h5>
                                    </div>

                                    <DatePicker selected={date} onChange={changeDate}
                                        className='calendar' />
                                </div>

                                {err && (Array.isArray(err.data) ? ((err.data).map((error, index) => {
                                    return (
                                        <span key={index} style={{color: "red", fontSize: "12px"}}>{error.message}</span>
                                    )

                                })) : <span  style={{color: "red", fontSize: "12px"}}>{err.message}</span>)
                            }
                                <span>
                                    By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.
                                    You may receive SMS notifications from us and can opt out at any time.
                                </span>

                                <button className='signup' onClick={handleClick}>Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
                : window.location.reload()
            }
        </>
    )
}

export default Register