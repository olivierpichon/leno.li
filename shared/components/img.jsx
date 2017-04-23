import React, { PropTypes } from 'react'
import { Link } from 'react-router'

class Picture extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const img = this.props.img
    return (
      <div>
        <Link to="#">{img.get('name')}</Link>
        <img src={img.get('thumbnail')} />
      </div>
    );
  }
}

export default Picture
