import React from 'react'
import './signup.css'
import axios from 'axios'
import signup from '../components/images/signup.jpg'

const Signup = () => {
  
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
      <img className='signup_img' src={signup} alt='sign up'></img>
      <form onSubmit={handleSubmit}>
        <h2 className='signup_title'>Sign Up</h2>
        <label for='username' className='signup_label'>
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

        <label for='userEmail' className='signup_label'>
          User Email :
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

        <label for='password' className='signup_label'>
          Password :
          <input
            type='password'
            name='password'
            id='password'
            className='input_field'
            placeholder='Enter Password'
            required
            pattern='[A-Z]{1}[a-z]{6,}[0-9]{2}'
          ></input>
        </label>

        <label for='phoneNumber' className='signup_label'>
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
      <div className='instructions'>
        <h5>Instructions:</h5>
        <p>
          1)Password:Alphanumeric More than
          6 characters. Example (Viniths12,Kishore54).
        </p>
        <p>2)Email Id: should have valid '@' symbol and lowercase.</p>
      </div>
    </div>
  )
}

export default Signup
