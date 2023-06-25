import './post.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis, faCommentAlt, faShare, faHeart
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useState } from 'react';


const Post = ({ post }) => {
    const liked = false;

    const [commentOp, setCommentOp] = useState(false);
    return (
        <div className="post">

            <div className="showPost">
                <div className="avatar">
                    <img src={post.profileImg} />
                </div>

                <div className="postInfo">
                    <div className="title">
                        <div className="left">
                            <Link to={`/profile/${post.userId}`} style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                fontWeight: 'bolder'
                            }}>
                                <span>{post.firstName} {post.lastName}</span>
                            </Link>

                            <span className='username'>@{post.username}</span>
                            <span className='username'>1 minute ago</span>
                        </div>

                        <div className="right">
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                    </div>

                    <div className="content">
                        <p>Đây là content asdnfokasdnfiowae'pr wnelfmasdf
                            werwerjeisofhjasoifamsdasdnjiweqad v
                            sdafhaisjdfhasjidf
                            adfjsdahf sdfasdfojkasdfpoasdfioawefnm
                        </p>
                        <img src={post.profileImg} />

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