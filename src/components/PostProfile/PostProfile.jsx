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
import Post from '../post/Post';


const PostProfile = ({content}) => {
    const { id } = useParams()
    const { isLoading: loadingPost, error: postErr, data: user } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
            makeRequest.get(`/userInfo?id=${id}`)
                .then(res => {

                    return res.data;
                })
    })

    const [popUp, setPopUp] = useState(false);
    const { currentUser } = useContext(AuthContext)

    
    const [commentOp, setCommentOp] = useState(false);
 


    const { isLoading, error, data } = useQuery(['likes', content?._id],
        () =>
            makeRequest.get("/likes?postId=" + content?._id)
                .then(res => {
                    return res.data;
                })
    )
    const queryClient = useQueryClient()

    const mutation = useMutation((liked) => {
        if (liked) return makeRequest.delete("/likes/delete?postId=" + content?._id)
        return makeRequest.post("/likes/add?postId=" + content?._id)
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
            makeRequest.get("/comments?postId=" + content?._id)
                .then(res => {
                    return res.data;
                })
    })
    const handleLike = () => {
        console.log(data.includes(currentUser.id));
        mutation.mutate(data.includes(currentUser.id))
    }

    const mutation1 = useMutation(() => {

        return makeRequest.delete("/posts/delete/" + content?._id)
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
        <>
            
                    <div className="post" >

                        <div className="showPost">
                            <div className="avatar">
                                <a href={`/profile/${user?._id}`} style={{
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
                                        <a href={`/profile/${user?._id}`} style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            fontWeight: 'bolder'
                                        }}>
                                            <span>{user?.firstName} {user?.lastName}</span>
                                        </a>

                                        <span className='username'>@{user?.username}</span>
                                        <span className='username'>{moment(content?.createdAt).fromNow()}</span>
                                    </div>

                                    <div className="right">
                                        <FontAwesomeIcon icon={faEllipsis} onClick={(e) => setPopUp(!popUp)} />
                                        {popUp ? <div className="pop">
                                            <button onClick={handleDelete}>delete</button>
                                        </div>
                                            : null}

                                    </div>
                                </div>

                                <div className="content">
                                    <p>{content?.desc}</p>
                                    <img src={content?.profileImg} />

                                    <div className="reaction">
                                        <div className="like">
                                            {Array.isArray(data) && data.includes(currentUser.id)
                                                ? <FontAwesomeIcon icon={faHeart} className='icon4' onClick={handleLike} />
                                                : <FontAwesomeIcon icon={faHeart} className='icon1' onClick={handleLike} />
                                            }
                                            {data != null ? <span>{data.length}</span> : <span>0</span>}

                                        </div>


                                        <div className="comment" onClick={() => setCommentOp(!commentOp)} >
                                            <FontAwesomeIcon icon={faCommentAlt} className='icon2' />


                                        </div>

                                        <FontAwesomeIcon icon={faShare} className='icon3' />

                                    </div>

                                    {commentOp && <Comments postId={content?._id} />}
                                </div>
                            </div>


                        </div>


                    </div>
        
        </>
    )
}

export default PostProfile;