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
        <div className="media all people">
          {imgs.map(img => (
            <Picture img={img} key={img.get('id')} />
          ))}
        </div>
      </div>
    );
  }
}

export default ImgList
