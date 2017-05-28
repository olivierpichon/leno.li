import React, { PropTypes } from 'react'

class HomePage extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <section id="banner">
        <div className="inner">
          <h1>Welcome to LenOli's Website</h1>
          <p>This is where you can follow Lena and Oli's adventures in Australia</p>
          <ul className="actions">
            <li><a href="#galleries" className="button alt scrolly big">Continue</a></li>
          </ul>
        </div>
      </section>
    )
  }
}

export default HomePage
