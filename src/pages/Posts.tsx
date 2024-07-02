import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../store/postsSlice';
import { addFavorite, deleteFavorite } from '../store/favoritesSlice';


type IPost = {
  userId: number,
  id: number,
  title: string,
  body: string
}
export default function Posts() {
  const {loading, error, posts} = useSelector(state => state.posts)
  const favorites = useSelector(state => state.favorites.favoriteList)

  const dispatch = useDispatch()
  console.log(favorites)

  useEffect(() => {
    dispatch(getPosts())
  }, [])
  
  return (
    <div className='w-[1140px] mx-auto flex'>
      <div className='flex flex-col gap-4 my-12'>
        {loading? 'Loading...' : error? error.message : posts.map((post : IPost) => (
          <div key={post.id} className='bg-slate-300 px-4 py-2'>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => dispatch(addFavorite(post))} className='px-4 py-2 bg-red-600 rounded-lg '>Add Favorites</button>
          </div>
        ))}
      </div>
    </div>
  )
}
