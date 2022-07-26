import React from 'react'
import FetchPage from './FetchPage'
const Dashboard = () => {
  return (
    <div><button className="btn btn-dark"><a href='http://localhost:5000/auth/logout'>Logout</a></button>
    <button className="btn btn-dark"><a href='/lostForm'>Post A Lost Item</a></button>
    <button className="btn btn-dark"><a href='/profile'>Profile</a></button>

    <FetchPage/>
    
    </div>
    
  )
}

export default Dashboard