import React, { PropTypes } from 'react'
import { Link } from 'react-router'

class Picture extends React.Component {
  constructor (props) {
    super(props)
    const urlCreator = window.URL || window.webkitURL
    const imageUrl = urlCreator.createObjectURL(this.props.img.get('thumbnailBlob'))
    this.state = {imageUrl}
  }

  render() {
    const img = this.props.img
    return (
      <div>
        <Link to="#">{img.get("name")}</Link>
        <img src={this.state.imageUrl} />
      </div>
    );
  }
}

export default Picture
