import React from 'react'
import './home.css'
import Navigation from '../navigation/nav'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Tring Library Management',
    }
    this.summaryStory = this.summaryStory.bind(this)
    this.calbacktitle = this.calbacktitle.bind(this)
  }
  summaryStory = () => {
    this.setState({
      message:
        'The only thing that you absolutely have to know, is the location of the library',
    })
  }
  calbacktitle = () => {
    this.setState({
      message: 'Tring Library Management',
    })
  }

  render() {
    return (
      <div>
        <Navigation />
        <h3
          className='welcome_title'
          onMouseOver={this.summaryStory}
          onMouseOut={this.calbacktitle}
        >
          {this.state.message}
        </h3>
      </div>
    )
  }
}

export default Home
