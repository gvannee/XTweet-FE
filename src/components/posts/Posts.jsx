import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios';
import Post from '../post/Post';

const Posts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makeRequest.get("/newsfeed/posts")
        .then(res => {
          return res.data;
        })
  })


  return (
    <>
      {data && data.map((post, index) => {
        return <Post post={post} key={index} />
      })}
    </>
  )
}

export default Posts