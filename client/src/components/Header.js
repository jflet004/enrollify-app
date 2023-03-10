import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/user';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/Header.css'
const Header = () => {
  
  const { currentUser } = useContext(UserContext)
  const location = useLocation()
  const navigate = useNavigate()

  const [dailyQuote, setDailyQuote] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(r => r.json())
      .then(quotes => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setDailyQuote(randomQuote);
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }, [])

  const handleGoBack = () => navigate(-1)

if (loading) return <h1>Loading</h1>

return (
  <div className='header'>
    {!currentUser || currentUser.error ? (
      <h3>Welcome. Please login or create an account</h3>
      ) : (
        <div>
        {location.pathname === '/' && (
          <h3>Welcome {currentUser.first_name}</h3>
          )}
        {currentUser.admin && (
          <p><em>{dailyQuote.text}</em></p>
          )}
      <br/>
      </div>
    )}
  <>
  </>
  </div>
);

}

export default Header
