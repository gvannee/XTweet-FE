import './leftBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPaw, faHouse, faMagnifyingGlass, faBell,
    faBookmark, faEnvelope, faListUl, faCircleCheck, faUser,
    faAnglesRight, faPlus
} from '@fortawesome/free-solid-svg-icons'

import Avatar from '../../assets/images/avatar.jpg'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
const LeftBar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="leftBar">
            <div className="container">
                <div className="top">
                    <div className="logo">
                        <a href="#">
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
                    <a href="#">
                    <img src= {currentUser.profileImg} alt='avatar' />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LeftBar