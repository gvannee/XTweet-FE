
import './home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faImage, faBarsProgress, faFaceSmile, faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import Post from '../../components/post/Post';
const Home = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="Home">
            <nav>
                <h3>Home</h3>
                <div className="tablist">
                    <div className="forYou">
                        <span>For You</span>
                    </div>

                    <div className="following">
                        <span>Following</span>
                    </div>
                </div>
            </nav>
            <div className="createPost">
                <div className="content">
                    <div className="left">
                        <img src={currentUser.profileImg} alt='avatar' />
                    </div>

                    <div className="right">
                        <input type="text" placeholder="What's happening!?" />
                    </div>
                </div>

                <div className="action">
                    <div className="leftIcon">
                        <a href="#
                        ">
                            <FontAwesomeIcon icon={faImage} className='icon' />
                        </a>

                        <a href="#"><FontAwesomeIcon icon={faBarsProgress} className='icon' /></a>

                        <a href="#"><FontAwesomeIcon icon={faFaceSmile} className='icon' /></a>

                        <a href="#"><FontAwesomeIcon icon={faCalendarDay} className='icon' /></a>


                    </div>

                    <div className="btnRight">
                        <button>Tweet</button>
                    </div>
                </div>
            </div>
            <div className="hidePost">
                <span>Show 186 Tweets</span>
            </div>
            <div className="showPost">
                <Post post= {currentUser}/>

            </div>
        </div>
    )
}

export default Home;