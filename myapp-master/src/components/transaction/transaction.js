import React, { useState, useEffect } from 'react'

import './transaction.css'
import Navigation from '../navigation/nav'

const Transaction = () => {
  const axios = require('axios')
  const [booktranscation, setbooktranscation] = useState([])

  const BASE_URL = process.env.REACT_APP_KEY

  let userdetails = localStorage.getItem('email')
  userdetails = JSON.parse(userdetails)

  const getbookTransaction = async () => {
    try {
      const transdata = await axios.get(
        `${BASE_URL}/transcation/${userdetails.logdata.userId}`
      )
      console.log(transdata.data)
      setbooktranscation(transdata.data)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getbookTransaction()
  }, [])

  const renewrow = async(UserId, BookId) => {
await axios
      .put(`${BASE_URL}/transcation/${UserId}/${BookId}`, {})
      .then((response) => {
        alert(response.data.message)
      })

      try {
        const transdata = await axios.get(
          `${BASE_URL}/transcation/${UserId}`
        )
        setbooktranscation(transdata.data)
      } catch (e) {
        console.log(e)
      }

  }



  const deleterow = async (BookId, UserId,duedate) => {
    await axios
      .delete(`${BASE_URL}/transcation/${BookId}/${UserId}`)
      .then((response) => {
        alert(response.data.message)
        setbooktranscation(
          booktranscation.filter((item) => {
            return item.BookId != BookId
          })
        )
      })

    await axios.put(`${BASE_URL}/books/${BookId}`, {})

    await axios.put(`{BASE_URL}/users/${UserId}/${duedate}`, {})
  }
  return (
    <div className='transaction'>
      <Navigation />
      <h2 className='tsc_title'>Transaction details</h2>
      <table id='heading' className='tscTable'>
        <thead>
          <tr>
            <th> BookId </th>
            <th>BookName</th>
            <th>IssueDate</th>
            <th>Duedate</th>
            <th>Renewdate</th>
            <th>Return</th>
            <th>Renew</th>
          </tr>
        </thead>
        <tbody>
          {booktranscation.map((item) => {
            return (
              <tr>
                <td>{item.BookId} </td>
                <td>{item.BookName} </td>
                <td>{item.IssueDate}</td>
                <td> {item.duedate}</td>
                <td> {item.renewdate}</td>
                <td>
                  {' '}
                  <button
                    className='btn'
                    onClick={() => {
                      deleterow(item.BookId, item.UserId,item.duedate)
                    }}
                  >
                    Return
                  </button>
                </td>
                <td>
                  {' '}
                  <button
                    className='btn'
                    onClick={() => {
                      renewrow(item.UserId, item.BookId)
                    }}
                  >
                    Renew
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default Transaction
