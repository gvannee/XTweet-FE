import './postProfile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis, faCommentAlt, faShare, faHeart
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';


const PostProfile = ({ post }) => {
    const {id} = useParams();
    const { currentUser } = useContext(AuthContext)
    const { isLoading, error, data: like } = useQuery(['likes', post.post._id],
        () =>
            makeRequest.get("/likes?postId=" + post.post._id)
                .then(res => {
                    return res.data;
                })
    )
    const queryClient = useQueryClient()
    console.log(like);
    const mutation = useMutation((liked) => {
        if (liked) return makeRequest.delete("/likes/delete?postId=" + post.post._id)
        return makeRequest.post("/likes/add?postId=" + post.post._id)
    }
        ,
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries(["likes"])
                console.log(res.data);
            }
        })
    const handleLike = () => {
        console.log(like.includes(id));
        mutation.mutate(like.includes(id))
    }

    console.log(like);
    

    const posts = post.post
    const [commentOp, setCommentOp] = useState(false);
    return (
        <div className="post">
            {Array.isArray(posts) ? posts.map((data, index) => {
                return (
                    <div className="showPost" key={index}>
                        <div className="avatar">
                            <Link to={`/profile/${post.info?._id}`} style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                fontWeight: 'bolder',
                                cursor: 'pointer'
                            }}>
                                <img src={post.info?.profileImg} alt='avatar'  />
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
                                    <span className='username'>{moment(data.createdAt).fromNow()}</span>
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
                                        {Array.isArray(like) && like.includes(id)
                                            ? <FontAwesomeIcon icon={faHeart} className='icon4' onClick={handleLike} />
                                            : <FontAwesomeIcon icon={faHeart} className='icon1' onClick={handleLike} />
                                        }
                                        {like != null ? <span>{like.length}</span> : <span>0</span>}
                                    </div>


                                    <div className="comment" onClick={() => setCommentOp(!commentOp)}>
                                        <FontAwesomeIcon icon={faCommentAlt} className='icon2' />
                                        <span>12</span>
                                    </div>

                                    <FontAwesomeIcon icon={faShare} className='icon3' />

                                </div>

                                {commentOp && <Comments key={index} postId={data._id} />}
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