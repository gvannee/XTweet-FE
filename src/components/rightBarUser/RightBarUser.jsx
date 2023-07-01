import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import './rightBarUser.scss'

const UserDiv = ({ user }) => {

    const queryClient = useQueryClient();
    const { isLoading: relationshipLoading, data: relationshipData } = useQuery(['relationship'],
        () =>
            makeRequest.get(`/getFollow/`)
                .then(res => {

                    console.log(res.data);

                    return res.data;
                })
    )

  

    const mutation = useMutation((followed) => {
        if (followed) return makeRequest.delete("/unfollow/" + user.id)
        return makeRequest.post("/follow/" + user.id)
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
        mutation.mutate(relationshipData.includes(user.id))
    }
    return (
        <div className="user">
            <div className="left">
                <div className="avatar">
                    <img src={user.profileImg} alt="avatar" />
                </div>

                <div className="info">
                    <p>{user.firstName} {user.lastName}</p>
                    <span>@{user.username}</span>
                </div>
            </div>

            {relationshipLoading ? "Loading"
                : (<button onClick={handleClick}
                    value={user.id}>{Array.isArray(relationshipData) &&
                        (relationshipData.includes(user.id) ? "Following" : "Follow")}</button>)}
        </div>
    )
}

export default UserDiv;