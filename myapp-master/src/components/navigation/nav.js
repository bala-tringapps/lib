import React from 'react'
import './nav.css'

import { Link } from 'react-router-dom'

function Navigation() {
  function onLogout() {
    localStorage.setItem('log', false)
    alert('Logout Succesfully')
  }

  return (
    <div className='bg_image'>
      <nav>
        <div className='topnav'>
          <ul>
            <Link to='/home'>
              <li className='active'>Home</li>
            </Link>
            <Link to='/about'>
              <li>Profile</li>
            </Link>
            <Link to='/booklist'>
              <li>Book List</li>
            </Link>
            <Link to='/transaction'>
              <li>Transaction</li>
            </Link>

            <Link to='/'>
              <button className='logout' onClick={onLogout}>
                LOGOUT
              </button>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navigation
