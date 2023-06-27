
import './home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faImage, faBarsProgress, faFaceSmile, faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import Post from '../../components/post/Post';
import { Link, useNavigate } from 'react-router-dom';
import Posts from '../../components/posts/Posts';
import {useMutation, QueryClient, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios';

const Home = () => {
    const { currentUser } = useContext(AuthContext);

    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");

    const [inputFile, setInputFile] = useState(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation((newPost) => {
        return makeRequest.post("/addPost", newPost)
    }
    ,
    {
        onSuccess: (res) => {
            queryClient.invalidateQueries(["posts"])
            console.log(res.data);
        }
    })

    const handleClick = (e) => {
        e.preventDefault();
        mutation.mutate({
            desc: desc
        })
    }




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
                        <Link to={`/profile/${currentUser.id}`} style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 'bolder',
                            cursor: 'pointer'
                        }}>
                            <img src={currentUser.profileImg} alt='avatar' id={currentUser.id} />
                        </Link>

                    </div>

                    <div className="right">
                        <input type="text" placeholder="What's happening!?"
                            onChange={(e) => { setDesc(e.target.value) }}
                        />
                    </div>
                </div>

                <div className="action">
                    <div className="leftIcon">
                        <a href="#" onClick={() => { setInputFile(!inputFile) }}
                        >
                            <FontAwesomeIcon icon={faImage} className='icon' />
                        </a>

                        <a href="#"><FontAwesomeIcon icon={faBarsProgress} className='icon' /></a>

                        <a href="#"><FontAwesomeIcon icon={faFaceSmile} className='icon' /></a>

                        <a href="#"><FontAwesomeIcon icon={faCalendarDay} className='icon' /></a>


                    </div>

                    <div className="btnRight">
                        <button onClick={handleClick}>Tweet</button>
                    </div>


                </div>
                <div style={{ marginLeft: "10%" }}>
                    {inputFile &&
                        <input
                            type='file'
                            style={{ textAlign: "center", alignItems: "center" }}
                            onChange={(e) => { setFile(e.target.files[0]) }}
                        />}
                </div>
            </div>
            <div className="hidePost">
                <span>Show 186 Tweets</span>
            </div>
            <div className="showPost">
                <Posts />

            </div>
        </div>
    )
}

export default Home;