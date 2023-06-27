import './postProfile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis, faCommentAlt, faShare, faHeart
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';


const PostProfile = ({ post }) => {
    const liked = false;
    const { currentUser } = useContext(AuthContext)

    const posts = post.post
    const [commentOp, setCommentOp] = useState(false);
    return (
        <div className="post">
            {Array.isArray(posts) ? posts.map(data => {
                return (
                    <div className="showPost">
                        <div className="avatar">
                            <Link to={`/profile/${post.info?._id}`} style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                fontWeight: 'bolder',
                                cursor: 'pointer'
                            }}>
                                <img src={post.info?.profileImg} alt='avatar' id={post?.userId} />
                            </Link>
                        </div>

                        <div className="postInfo">
                            <div className="title">
                                <div className="left">
                                    <Link to={`/profile/${post.info?.userId}`} style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        fontWeight: 'bolder'
                                    }}>
                                        <span>{post.info?.firstName} {post.info?.lastName}</span>
                                    </Link>

                                    <span className='username'>@{post.info?.username}</span>
                                    <span className='username'>{data.createdAt}</span>
                                </div>

                                <div className="right">
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </div>
                            </div>

                            <div className="content">
                                <p>{data.desc}</p>
                                <img src={data.profileImg} />

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
                )
            }) : null
            }



        </div>
    )
}

export default PostProfile;