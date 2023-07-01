import './update.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { makeRequest } from '../../axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const Update = ({setUpdate, users}) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(true)

    //create user data 
    const [gender, setGender] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [err, setErr] = useState(null);


    const month = date.toLocaleString("en-us", { month: "long" });
    const day = date.toLocaleString("en-us", { day: "2-digit" });
    const year = date.getFullYear();
    const dob = month + " " + day + " " + year

    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);

    const {id} = useParams();
   

    
    const changeGender = (event) => {
        setGender(event.target.value)
    }

    const changeUsername = (event) => {
        setUsername(event.target.value)
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


    const changeDate = (event) => {
        setDate(event);
       
    }

    const user = {
        gender: gender,
        username: username,
        phone: phone,
        dob: dob,
        firstName: firstName,
        lastName: lastName,
    }

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data

        } catch (e) {
            console.log(e);
        }
    }

    const queryClient = useQueryClient();
    const mutation = useMutation((user) => {
        return makeRequest.put("/user/info/" + id, user)
    }
    ,
    {
        onSuccess: (res) => {
            queryClient.invalidateQueries(["user"])
            console.log(res.data);
        }
    })

    



    const handleClick = async (e) => {
        e.preventDefault();
        // let coverUrl = users?.coverImg;
        // let profileUrl = users?.profileImg;

        // coverUrl = cover && await upload(cover) 
        // profileUrl = profileUrl && await upload(profile)
        // user.coverImg = coverUrl;
        // user.profileUrl = profileUrl
        mutation.mutate({
            updateInfo: user
        })
        
        setUpdate(false)
  
        
    }



    return (
        <>
            
                <div className="update">
                    <div className="card">

                        <div className='right'>

                            <div className='title'>
                                <div className='leftTitle'>
                                    <h1>Update </h1>
                                    <p>It's quick and easy.</p>
                                </div>
                                <FontAwesomeIcon icon={faXmark} onClick={() => setUpdate(false)} className='icon' />
                            </div>

                            <form>
                                <div className='name' >
                                    <input type="text" placeholder='First Name'  value={firstName} onChange={changeFirstName}/>
                                    <input type="text" placeholder='Last Name'  value={lastName} onChange={changeLastName}/>
                                </div>
                                <input type="text" placeholder='username' value={username} onChange={changeUsername} />
                                <input type="text" placeholder='Phone number' value={phone} onChange={changePhone} />
                                <input type='password' placeholder='Gender' value={gender} onChange={changeGender} />
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

                                <button className='signup' onClick={handleClick}>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
           
        </>
    )
}

export default Update