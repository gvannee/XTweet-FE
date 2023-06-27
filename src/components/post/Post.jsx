import './post.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis, faCommentAlt, faShare, faHeart
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';


const Post = ({ post }) => {
    const liked = false;
    const {currentUser} = useContext(AuthContext)
    const postInfo = post.post;
    const user = post.user;
    const [commentOp, setCommentOp] = useState(false);
    return (
        <div className="post">

            <div className="showPost">
                <div className="avatar">
                <Link to={`/profile/${postInfo?.userId}`} style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                fontWeight: 'bolder',
                                cursor: 'pointer'
                            }}>
                                <img src={user?.profileImg} alt='avatar' />
                </Link>
                </div>

                <div className="postInfo">
                    <div className="title">
                        <div className="left">
                            <Link to={`/profile/${postInfo?.userId}`} style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                fontWeight: 'bolder'
                            }}>
                                <span>{user?.firstName} {user?.lastName}</span>
                            </Link>

                            <span className='username'>@{user?.username}</span>
                            <span className='username'>{postInfo?.createdAt}</span>
                        </div>

                        <div className="right">
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                    </div>

                    <div className="content">
                        <p>{postInfo?.desc}</p>
                        <img src={post?.profileImg} />

                        <div className="reaction">
                            <div className="like">
                                {liked
                                    ? <FontAwesomeIcon icon={faHeart} className='icon4' />
                                    : <FontAwesomeIcon icon={faHeart} className='icon1' />
                                }

                                <span>12</span>
                            </div>


                            <div className="comment" onClick={() => setCommentOp(!commentOp)}>
                                <FontAwesomeIcon icon={faCommentAlt} className='icon2' />
                                <span>12</span>
                            </div>

                            <FontAwesomeIcon icon={faShare} className='icon3' />

                        </div>

                        {commentOp && <Comments />}
                    </div>
                </div>


            </div>


        </div>
    )
}

export default Post;