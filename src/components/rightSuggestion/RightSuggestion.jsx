import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import UserDiv from "../rightBarUser/RightBarUser";

const UserSuggestion = () => {
    const { isLoading, error, data } = useQuery(['user'],
        () =>
            makeRequest.get("/allUsers")
                .then(res => {
                    return res.data;
                })
    )
    return (
        <>
            {data && data.map(userInfo => {
                return <UserDiv key={userInfo.id} user={userInfo} />
            })}
        </>
    )
}

export default UserSuggestion;