import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './store/store.ts'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Posts from './pages/Posts.tsx'
import Favorites from './pages/Favorites.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <nav className='p-4 text-lg flex justify-center bg-slate-600'>
        <ul className='flex gap-8'>
          <Link className='border-b-2 border-transparent hover:border-slate-400 text-white' to={'/'}>Todo</Link>
          <Link className='border-b-2 border-transparent hover:border-slate-400 text-white' to={'/posts'}>Posts</Link>
          <Link className='border-b-2 border-transparent hover:border-slate-400 text-white' to={'/favorites'}>Favorites</Link>
        </ul>
      </nav>
        <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/posts' element={<Posts/>} />
          <Route path='/favorites' element={<Favorites/>} />
          <Route path='*' element={<App/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
