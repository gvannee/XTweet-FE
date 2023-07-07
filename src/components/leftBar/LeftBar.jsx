import './leftBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPaw, faHouse, faMagnifyingGlass, faBell,
    faBookmark, faEnvelope, faListUl, faCircleCheck, faUser,
    faAnglesRight, faPlus
} from '@fortawesome/free-solid-svg-icons'

import Avatar from '../../assets/images/avatar.jpg'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const LeftBar = () => {
    const { currentUser } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const showLogout = () => {
        setShow(!show)
    }

    const logout =  () => {
        
            localStorage.removeItem('user');
            navigate("/login")
       
    }
    return (
        <div className="leftBar">
            <div className="container">
                <div className="top">
                    <div className="logo">
                        <a href="/">
                            <FontAwesomeIcon icon={faPaw} className='logoIcon' />
                        </a>
                    </div>
                    <div className="menu">
                        <a href="#" >
                            <FontAwesomeIcon icon={faHouse} className='icon' />
                        </a>

                        <a href="#" >
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' />
                        </a>

                        <a href="#" >
                            <FontAwesomeIcon icon={faBell} className='icon' />
                        </a>

                        <a href="#" >
                            <FontAwesomeIcon icon={faEnvelope} className='icon' />
                        </a>

                        <a href="#" >
                            <FontAwesomeIcon icon={faListUl} className='icon' />
                        </a>

                        <a href="#" >
                            <FontAwesomeIcon icon={faBookmark} className='icon' />
                        </a>

                        <a href="#" >
                            <FontAwesomeIcon icon={faCircleCheck} className='icon' />
                        </a>

                        <a href="#" >
                            <FontAwesomeIcon icon={faUser} className='icon' />
                        </a>

                        <a href="#" >
                            <FontAwesomeIcon icon={faAnglesRight} className='icon' />
                        </a>

                        <a href="#" >
                            <FontAwesomeIcon icon={faPlus}
                                style={{
                                    width: '43px',
                                    height: '43px',
                                    borderRadius: "50%"
                                }}
                                className='icon'
                            />

                        </a>

                    </div>
                </div>
                <div className="bot">
                    {show ? <div className='logout'><button onClick={logout}>Logout</button></div> : null
                    }
                    <a  >
                        <img src={currentUser.profileImg} alt='avatar' onClick={showLogout} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LeftBar