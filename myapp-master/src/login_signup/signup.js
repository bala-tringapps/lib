import React from 'react'
import './signup.css'
import axios from 'axios'

const Signup = () => {
  var auth = localStorage.getItem('auth')

  const BASE_URL = process.env.REACT_APP_KEY

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Clicked')

    axios
      .post(`${BASE_URL}/add`, {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        password: document.getElementById('password').value,
      })
      .then((resp) => {
        alert(resp.data.message)
        document.getElementById('username').value = ''
        document.getElementById('email').value = ''
        document.getElementById('phoneNumber').value = ''
        document.getElementById('password').value = ''
      })

    console.log('working')
  }

  return (
    <div className='signup_container'>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <div className='signup'>
            User Name
            <input
              type='text'
              name='username'
              id='username'
              required
              pattern='^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$'
            ></input>
          </div>
          <br />
          <div className='signup'>
            User Email
            <input
              type='email'
              name='email'
              id='email'
              required
              pattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
            ></input>
          </div>
          <br />
          <div className='signup'>
            Password
            <input
              type='password'
              name='password'
              id='password'
              required
              pattern='[A-Z]{1}[a-z]{5,}[0-9]{2}'
              onChange={onchange}
            ></input>
          </div>
          <br />
          <div className='signup'>
            Phone No
            <input
              type='tel'
              id='phoneNumber'
              name='phoneNumber'
              required
              pattern='[5-9]{1}[0-9]{9}'
            />
          </div>
          <br />
          <div className='btn_parent'>
            <button className='register' type='submit'>
              Register
            </button>
          </div>
        </div> */}
        <h2 className='signup_title'>Sign Up</h2>
        <label for='username'>
          User Name:
          <input
            type='text'
            name='username'
            id='username'
            className='input_field'
            placeholder='Enter your Name'
            required
            pattern='^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$'
          ></input>
        </label>

        <label for='userEmail'>
          Email Id:
          <input
            type='email'
            name='email'
            id='email'
            className='input_field'
            placeholder='Email Id'
            required
            pattern='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
          ></input>
        </label>

        <label for='password'>
          Password:
          <input
            type='password'
            name='password'
            id='password'
            className='input_field'
            placeholder='Enter Password'
            required
            pattern='[A-Z]{1}[a-z]{5,}[0-9]{2}'
          ></input>
        </label>

        <label for='phoneNumber'>
          Mobile No:
          <input
            type='tel'
            name='phoneNumber'
            id='phoneNumber'
            className='input_field'
            placeholder='Enter Mobile No'
            required
            pattern='[7-9]{1}[0-9]{9}'
          ></input>
        </label>
        <button className='register_btn'>Register</button>
      </form>
    </div>
  )
}

export default Signup
