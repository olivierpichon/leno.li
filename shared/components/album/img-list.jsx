import React, { PropTypes } from 'react'
import Picture from './img'

class ImgList extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const imgs = this.props.imgs
    return (
      <div className="content">
        {imgs.map(img => (
          <Picture img={img} key={img.get('id')} />
        ))}
      </div>
    );
  }
}

export default ImgList
