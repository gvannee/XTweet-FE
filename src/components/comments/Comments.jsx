import { useContext, useRef, useState } from 'react'
import './comments.scss'
import { AuthContext } from '../../context/authContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment/moment';
import { io } from 'socket.io-client';


const Comments = ({ postId }) => {
    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [desc, setDesc] = useState("");
    const socket = useRef(io("ws://localhost:4000"));
    const { isLoading, error, data } = useQuery({
        queryKey: ['comments'],
        queryFn: () =>
            makeRequest.get("/comments?postId=" + postId)
                .then(res => {
                    return res.data;
                })
    })

    const mutation = useMutation((newComment) => {
        return makeRequest.post("/comments/add?postId="+ postId, newComment)
    }
    ,
    {
        onSuccess: (res) => {
            queryClient.invalidateQueries(["comments"])
            console.log(res.data);
        }
    })

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({
            desc: desc
        })

       setDesc("")
        // socket.current.emit("description", {
        //     userId: currentUser.id,
        //     postId: postId,
        //     text: desc
        // })
        // try {
            
        //         await makeRequest.post("/comments/add?postId="+ postId, {desc: desc})
            
        // }
        // catch (err) {
        //     console.log(err);
        // }
     

        
        
    }



    return (
        <div className='comments'>
            <div className="write">
                <img src={currentUser.profileImg} alt="avatar" />
                <input type="text" placeholder='write a comment'  
                onChange={e => setDesc(e.target.value)}
                value={desc}
                />

                <button onClick={handleClick}>Send</button>
            </div>
            {isLoading
                ? "loading"
                : (data && data.map((comment, index) => {
                    const comments = comment.comments;
                    const user = comment.user;
                    return (
                        <div className="comment" id={index}>
                            <img src={user.profileImg} alt="" />
                            <div className="info">
                                <span>{user.username}</span>
                                <p>{comments.desc}</p>
                            </div>

                            <span className='date'>{moment(comments.createAt).fromNow()}</span>
                        </div>)

                }))}
        </div>
    )
}

export default Comments;

