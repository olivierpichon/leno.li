import React, { PropTypes } from 'react'

class Loader extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div className={this.props.on ? "loader" : ""} />  
    )
  }
}

export default Loader
