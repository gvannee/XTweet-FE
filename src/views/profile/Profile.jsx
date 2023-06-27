import './profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft, faLocationDot, faBasketball
} from '@fortawesome/free-solid-svg-icons';

import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import Button from '../../components/buttonCustom/ButtoneCustom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import PostProfile from '../../components/PostProfile/PostProfile';
import { useParams } from 'react-router-dom';
const Profile = () => {
    const { currentUser } = useContext(AuthContext);


    let { id } = useParams();
    const { isLoading, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: () =>
          makeRequest.get(`/user/${id}`)
            .then(res => {
              return res.data;
            })
      })

    return (
        <div className="profile">
            <nav>
                <div className="icon">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>

                <div className="name">
                    <p>Name</p>

                    <span>1 Tweet</span>

                </div>
            </nav>
            <div className="images">
                <img src="https://images.immediate.co.uk/production/volatile/sites/25/2023/02/why-sky-blue-2db86ae.jpg?quality=90&webp=true&resize=1200,800" alt="" className='cover' />
                <div className="edit">
                    <img src="https://thumbor.bigedition.com/cat-yelling-at-a-skeleton/xGqZpCpf8c0xVbHjeBZn_k_JiTc=/765x800/filters:format(webp):quality(80)/granite-web-prod/e0/d7/e0d762004dd143669b61860e5b5ff9ab.jpeg" alt="" className='profilePic' />
                    <Button value="Edit profile" />
                </div>
            </div>

            <div className="profileContainer">
                <div className="userInfo">
                    <div className="name">
                        <p>Name</p>

                        <span>@username</span>
                    </div>

                    <div className="place">
                        <div className="stayAt">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>Việt Nam</span>
                        </div>

                        <div className="born">
                            <FontAwesomeIcon icon={faBasketball} />
                            <span>Born November 13, 2002</span>
                        </div>

                    </div>

                    <div className="follow">
                        <div className="following">
                            <span className='number'>3</span>
                            <span>Following</span>
                        </div>

                        <div className="follower">
                            <span className='number'>3</span>
                            <span>Follower</span>
                        </div>
                    </div>
                </div>

                <div className="post">
                    {data && data.map((post, index) => {
                        return <PostProfile post={post} key={index} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Profile;