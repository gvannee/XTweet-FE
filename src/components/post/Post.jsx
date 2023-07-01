import './post.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis, faCommentAlt, faShare, faHeart
} from '@fortawesome/free-solid-svg-icons';

import Comments from '../comments/Comments';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { io } from 'socket.io-client';

const Post = ({ post }) => {
    const [popUp, setPopUp] = useState(false);
    const { currentUser } = useContext(AuthContext)
    const postInfo = post.post;
    
    const user = post.user;
    const [commentOp, setCommentOp] = useState(false);
    console.log(post.post._id);


    const { isLoading, error, data } = useQuery(['likes', post.post._id],
        () =>
            makeRequest.get("/likes?postId=" + post.post._id)
                .then(res => {
                    return res.data;
                })
    )
    const queryClient = useQueryClient()

    const mutation = useMutation((liked) => {
        if (liked) return makeRequest.delete("/likes/delete?postId="+ post.post._id)
        return makeRequest.post("/likes/add?postId="+ post.post._id)
    }
    ,
    {
        onSuccess: (res) => {
            queryClient.invalidateQueries(["likes"])
            console.log(res.data);
        }
    })

    const { isLoading: loading, error: err, data: comments } = useQuery({
        queryKey: ['comments'],
        queryFn: () =>
            makeRequest.get("/comments?postId=" + post.post._id)
                .then(res => {
                    return res.data;
                })
    })
    const handleLike = () => {
        console.log(data.includes(currentUser.id));
        mutation.mutate(data.includes(currentUser.id))
    }

    const mutation1 = useMutation(() => {
        
        return makeRequest.delete("/posts/delete/" + post.post._id)
    }
    ,
    {
        onSuccess: (res) => {
            queryClient.invalidateQueries(["posts"])
            console.log(res.data);
        }
    })

    const handleDelete = () => {
        mutation1.mutate();
    }

   
  
    return (
        <div className="post">

            <div className="showPost">
                <div className="avatar">
                    <a href={`/profile/${postInfo?.userId}`} style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 'bolder',
                        cursor: 'pointer'
                    }}>
                        <img src={user?.profileImg} alt='avatar' />
                    </a>
                </div>

                <div className="postInfo">
                    <div className="title">
                        <div className="left">
                            <a href={`/profile/${postInfo?.userId}`} style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                fontWeight: 'bolder'
                            }}>
                                <span>{user?.firstName} {user?.lastName}</span>
                            </a>

                            <span className='username'>@{user?.username}</span>
                            <span className='username'>{moment(postInfo?.createdAt).fromNow()}</span>
                        </div>

                        <div className="right">
                            <FontAwesomeIcon icon={faEllipsis} onClick={(e) => setPopUp(!popUp)}/>
                            {popUp ? <div className="pop">
                                <button onClick={handleDelete}>delete</button>
                            </div>
                            : null}
                            
                        </div>
                    </div>

                    <div className="content">
                        <p>{postInfo?.desc}</p>
                        <img src={post?.profileImg} />

                        <div className="reaction">
                            <div className="like">
                                {Array.isArray(data) && data.includes(currentUser.id)
                                    ? <FontAwesomeIcon icon={faHeart} className='icon4' onClick={handleLike}/>
                                    : <FontAwesomeIcon icon={faHeart} className='icon1' onClick={handleLike}/>
                                }
                                {data != null ? <span>{data.length}</span> : <span>0</span> }
                                
                            </div>


                            <div className="comment" onClick={() => setCommentOp(!commentOp)} >
                                <FontAwesomeIcon icon={faCommentAlt} className='icon2' />
                                
                                
                            </div>

                            <FontAwesomeIcon icon={faShare} className='icon3' />

                        </div>

                        {commentOp && <Comments postId={postInfo._id} />}
                    </div>
                </div>


            </div>


        </div>
    )
}

export default Post;