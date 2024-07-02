import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFavorite } from '../store/favoritesSlice'

type IPost = {
  userId: number,
  id: number,
  title: string,
  body: string
}

export default function Favorites() {
  const favorites = useSelector(state => state.favorites.favoriteList)
  const dispatch = useDispatch()


  return (
    <div className='w-[1140px] mx-auto flex'>
    <div className='flex flex-col gap-4 my-12'>
      {favorites?.map((favorite: IPost) => (
         <div key={favorite.id} className='bg-slate-300 px-4 py-2'>
         <h2>{favorite.title}</h2>
         <p>{favorite.body}</p>
         <button onClick={() => dispatch(deleteFavorite(favorite.id))} className='px-4 py-2 bg-red-600 rounded-lg '>Delete</button>
       </div>
      ))
      }
    </div>
  </div>
  )
}
