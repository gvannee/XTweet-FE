import { useContext } from 'react'
import './comments.scss'
import { AuthContext } from '../../context/authContext'

const Comments = () => {
    const {currentUser} = useContext(AuthContext);
    const comments = [
        {
            profileImg: "https://haycafe.vn/wp-content/uploads/2022/02/Hinh-anh-avatar-facebook-doc-nen-ombre.jpg",
            username: "user1",
            desc: "day la comment"
        },

        {
            profileImg: "https://haycafe.vn/wp-content/uploads/2022/02/Hinh-anh-avatar-facebook-doc-nen-ombre.jpg",
            username: "user2",
            desc: "day la comment 2"
        }
    ]

    return (
        <div className='comments'>
            <div className="write">
                <img src={currentUser.profileImg} alt="avatar" />
                <input type="text" placeholder='write a comment' />
                <button>Send</button>
            </div>
            {comments.map((comment, index) => {
                return (
                    <div className="comment" key={index}>
                        <img src={comment.profileImg} alt="" />
                        <div className="info">
                            <span>{comment.username}</span>
                            <p>{comment.desc}</p>
                        </div>

                        <span className='date'>1 hour ago</span>
                    </div>)

            })}
        </div>
    )
}

export default Comments;

