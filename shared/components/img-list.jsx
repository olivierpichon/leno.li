import React, { PropTypes } from 'react'
import Picture from './img'

class ImgList extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const imgs = this.props.imgs
    return (
      <div className="image-list">
        <h1>Image List</h1>
        {imgs.map(img => (
          <Picture img={img} key={img.get('id')} />
        ))}
      </div>
    );
  }
}

export default ImgList
