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
import Posts from '../../components/posts/Posts';
const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [openUpdate, setUpdate] = useState(false)
    const queryClient = useQueryClient();
    let { id } = useParams();
    const { isLoading, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: () =>
            makeRequest.get(`/user/${id}`)
                .then(res => {



                    return res.data;
                })
    })

    const { isLoading: loadingUser, error: userErr, data: user } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
            makeRequest.get(`/userInfo?id=${id}`)
                .then(res => {

                    return res.data;
                })
    })


    let posts = data?.post

    if (data != null) {
        posts = data[0]?.post
    }
    console.log(data);




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

                    <p >{user?.firstName} {user?.lastName}</p>

                    <span>{user?.length} Tweet</span>

                </div>
            </nav>
            <div className="images">
                <img src={user?.coverImg} alt="" className='cover' />
                <div className="edit">
                    <img src={user?.profileImg} alt="" className='profilePic' />

                    {relationshipLoading ? "Loading" : (id == currentUser.id
                        ? <button onClick={() => setUpdate(true)}>Edit profile</button>
                        : <button onClick={handleClick}
                            value={id}>{Array.isArray(relationshipData) &&
                                (relationshipData.includes(id) ? "Following" : "Follow")}</button>)}

                </div>
            </div>



            <div className="profileContainer" >
              

                    
                        <div className="userInfo">
                            <div className="name">
                                <p>{user?.firstName} {user?.lastName}</p>

                                <span>@{user?.username}</span>
                            </div>



                            <div className="place">
                                <div className="stayAt">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    <span>Việt Nam</span>
                                </div>

                                <div className="born">
                                    <FontAwesomeIcon icon={faBasketball} />
                                    <span>Born {user?.dob}</span>
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
                    

               

                <div className="post">
                    {posts && posts.map((post, index) => {

                        return <>
                            { <PostProfile content={post} key={index} /> }
                        </>
                    })}


                </div>
            </div>

            {openUpdate && <Update setUpdate={setUpdate} user={data.info} />}
        </div>


    )
}

export default Profile;