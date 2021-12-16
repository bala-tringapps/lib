import React, { useState, useEffect } from 'react'
import './book.css'
import Navigation from '../navigation/nav'

let newDate = new Date()

const Issuedate = `${newDate.getFullYear()}-${
  newDate.getMonth() + 1
}-${newDate.getDate()}`
var duedate = new Date(Issuedate)
duedate.setDate(duedate.getDate() + 16)

const Books = () => {
  const axios = require('axios')
  const [books, setbooks] = useState([])
  const [search, setSearch] = useState([])
  const BASE_URL = process.env.REACT_APP_KEY

  let userdetails = localStorage.getItem('email')
  userdetails = JSON.parse(userdetails)

  const getbookdata = async () => {
    try {
      const data = await axios.get(`${BASE_URL}/books`)
      setbooks(data.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getbookdata()
  }, [])

  useEffect(() => {
    setbooks(
      books.filter((item) =>
        item.title.toLowerCase().trim().includes(search.trim().toLowerCase())
      )
    )
    if (search == '') {
      getbookdata()
    }
  }, [search])

  function add(transdata) {
    try {
      axios.post(`${BASE_URL}/transcation`, {
        BookId: transdata.BookId,
        BookName: transdata.title,
        UserId: userdetails.logdata.userId,
        IssueDate: Issuedate,
        duedate: duedate,
        renewdate: duedate,
      })

      axios.put(
        `${BASE_URL}/books/${transdata.BookId}/${userdetails.logdata.userId}`,
        {}
      )
    } catch (e) {
      console.log(e)
    }

    console.log(transdata)
  }

  return (
    <div className='Books'>
      <Navigation />
      <h2 className='book_detail'>Book details</h2>
      <div>
        <label htmlFor='search' className='search_label'>
          Search Book
        </label>
        <span>
          <input
            htmlFor='search'
            placeholder='Click to Search'
            // onChange={(e) => setSearch(e.target.value)}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </span>
      </div>
      <table id='heading' className='bookTable'>
        <thead>
          <tr>
            <th> BookId </th>
            <th>Title</th>
            <th>Author</th>
            <th>Edition</th>
            <th>Publisher</th>
            <th>Genre</th>
            <th>Url</th>
            <th>Count</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {books.map((bookitem) => {
            return (
              <tr>
                <td>{bookitem.BookId} </td>
                <td>{bookitem.title}</td>
                <td> {bookitem.author} </td>
                <td>{bookitem.edition} </td>
                <td>{bookitem.publisher} </td>
                <td>{bookitem.genre}</td>
                <td> {bookitem.url}</td>
                <td>{bookitem.count}</td>
                {bookitem.count <= 0 ? (
                  <th>Not available</th>
                ) : (
                  <td>
                    {' '}
                    <button
                      className='add_button'
                      onClick={() => add(bookitem)}
                    >
                      Add Book
                    </button>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default Books
