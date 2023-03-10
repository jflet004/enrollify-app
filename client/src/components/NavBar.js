import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user'
import "./css/NavBar.css"

const NavBar = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogoutClick = () => {
    fetch('/logout', {
      method: "DELETE"
    })
      .then(() => {
        setCurrentUser(null)
        navigate('/')
      })
    { }
  }



  return (
    <div className='navbar'>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/courses">Programs</NavLink>
      {currentUser && currentUser.admin && (
        <>
          <NavLink to="/calendar">Calendar</NavLink>
          <NavLink to="/admin">Admin Page</NavLink>
        </>
      )}
      {currentUser && !currentUser.error && !currentUser.admin && (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/register-students">Register Students</NavLink>
        </>
      )}
      {currentUser && !currentUser.error ? (
        <button onClick={handleLogoutClick} className='logout-btn'>Logout</button>
      ) : (
        <NavLink to="/signup">Create Account</NavLink>
      )}
    </div>
  )
}

export default NavBar
