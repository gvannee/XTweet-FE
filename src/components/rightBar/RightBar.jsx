import './rightBar.scss'
import Avatar from '../../assets/images/avatar.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
const RightBar = () => {
    const { currentUser } = useContext(AuthContext);



    return (
        <div className="rightBar">
            <div className="container">
                <div className="search">
                    <FontAwesomeIcon icon={faSearch}
                        style={{
                            color: "lightgray",
                            paddingLeft: "12px"
                        }} />
                    <input type="text" placeholder='Search Xtwitter' />
                </div>
                <div className="trending">
                    <div className="title">
                        <h3>Trends for you</h3>
                    </div>
                    <div className="hashtag">
                        <div className="location">
                            <p>
                                Trending in Vietnam
                            </p>
                            <FontAwesomeIcon icon={faEllipsis} />

                        </div>

                        <span className="tag">
                            Hóng
                        </span>

                        <p className="numberTweets">
                            39.6K Tweets
                        </p>
                    </div>

                    <div className="hashtag">
                        <div className="location">
                            <p>
                                Trending in Vietnam
                            </p>
                            <FontAwesomeIcon icon={faEllipsis} />

                        </div>

                        <span className="tag">
                            Hóng
                        </span>

                        <p className="numberTweets">
                            39.6K Tweets
                        </p>
                    </div>

                    <div className="more">

                        <span className="tag">
                            Show more...
                        </span>



                    </div>
                </div>

                <div className="suggestionUser">
                    <div className="title">
                        <h3>Who to follow</h3>
                    </div>
                    <div className="user">
                        <div className="left">
                            <div className="avatar">
                                <img src={Avatar} alt="avatar" />
                            </div>

                            <div className="info">
                                <p>Name</p>
                                <span>@username</span>
                            </div>
                        </div>

                        <button>
                            Follow
                        </button>
                    </div>

                    <div className="user">
                        <div className="left">
                            <div className="avatar">
                                <img src={Avatar} alt="avatar" />
                            </div>

                            <div className="info">
                                <p>Name</p>
                                <span>@username</span>
                            </div>
                        </div>

                        <button>
                            Follow
                        </button>
                    </div>
                    <div className="more">
                        <span className="tag">
                            Show more...
                        </span>
                    </div>
                </div>

                <div className="footer">
                    <div className="top">
                        <span>Terms of Service</span>
                        <span>Privacy Policy</span>
                        <span>Cookie Policy</span>
                    </div>

                    <div className="bot">
                        <span>Accessibility</span>
                        <span>Ads info</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightBar