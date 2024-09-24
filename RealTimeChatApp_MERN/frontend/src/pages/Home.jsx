import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'

const Home = () => {
  return (
 <div className="container mt-5 col-6">
  <div className="card p-2 shadow mb-3">
    <h1 className='text-center'>Chat App</h1>
  </div>
  <div className="card p-2 shadow">
         <div className="content mt-4">
          <Outlet/>
        </div>
  </div>
 </div>
  )
}

export default Home
