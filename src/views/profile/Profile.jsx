import './profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft, faLocationDot, faBasketball
} from '@fortawesome/free-solid-svg-icons';

import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import Button from '../../components/buttonCustom/ButtoneCustom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import PostProfile from '../../components/PostProfile/PostProfile';
import { Link, useParams } from 'react-router-dom';
import Update from '../../components/update/Update';
const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [openUpdate, setUpdate] = useState(false)
    const queryClient = useQueryClient();
    let { id } = useParams();
    const { isLoading, error, data } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
            makeRequest.get(`/user/${id}`)
                .then(res => {



                    return res.data;
                })
    })
    console.log(typeof data);

    const { isLoading: relationshipLoading, data: relationshipData } = useQuery(['relationship'],
        () =>
            makeRequest.get(`/getFollow`)
                .then(res => {



                    return res.data;
                })
    )

    const { isLoading: follower, data: followerData } = useQuery(['follower', 'relationship'],
        () =>
            makeRequest.get(`/getFollowed/` + id)
                .then(res => {



                    return res.data;
                })
    )

    const mutation = useMutation((followed) => {
        if (followed) return makeRequest.delete("/unfollow/" + id)
        return makeRequest.post("/follow/" + id)
    }
        ,
        {
            onSuccess: (res) => {
                queryClient.invalidateQueries(["relationship"])
                console.log(res.data);
            }
        })

    console.log(relationshipData);

    const handleClick = () => {
        mutation.mutate(relationshipData.includes(id))
    }

    return (
        <div className="profile">

            {data && data.map((post, index) => {


                return (<>
                    <nav>
                        <div className="icon">
                            <Link to="/" style={{
                                background: "none",
                                color: 'none',
                                textDecoration: 'none',
                                color: 'inherit'
                            }}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </Link>

                        </div>

                        <div className="name">

                            <p key={index}>{post?.info?.firstName} {post?.info?.lastName}</p>

                            <span>{post?.post?.length} Tweet</span>

                        </div>
                    </nav>
                    <div className="images">
                        <img src={post.info?.coverImg} alt="" className='cover' />
                        <div className="edit">
                            <img src={post.info?.profileImg} alt="" className='profilePic' />

                            {relationshipLoading ? "Loading" : (id == currentUser.id
                                ? <button onClick={() => setUpdate(true)}>Edit profile</button>
                                : <button onClick={handleClick}
                                    value={id}>{Array.isArray(relationshipData) &&
                                        (relationshipData.includes(id) ? "Following" : "Follow")}</button>)}

                        </div>
                    </div>
                </>)
            })
            }

            <div className="profileContainer" >
                {data && data.map((post, index) => {

                    return(
                        <div className="userInfo">
                        <div className="name">
                            <p>{post.info.firstName} {post.info.lastName}</p>

                            <span>@{post.info.username}</span>
                        </div>



                        <div className="place">
                            <div className="stayAt">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>Việt Nam</span>
                            </div>

                            <div className="born">
                                <FontAwesomeIcon icon={faBasketball} />
                                <span>Born {post.info.dob}</span>
                            </div>

                        </div>

                        <div className="follow">
                            <div className="following">
                                <span className='number'>{followerData ? followerData.length : 0}</span>
                                <span>Following</span>
                            </div>

                            <div className="follower">
                                <span className='number'>{relationshipData ? relationshipData.length : 0}</span>
                                <span>Follower</span>
                            </div>
                        </div>
                    </div>
                    )
                    
                })
                }

                <div className="post">
                    {data && data.map((post, index) => {

                        return <>
                            {post.post?.length !== 0 ? <PostProfile post={post} key={index} /> : null}
                        </>
                    })}
                </div>
            </div>

            {openUpdate && <Update setUpdate={setUpdate} user={data.info} />}
        </div>


    )
}

export default Profile;