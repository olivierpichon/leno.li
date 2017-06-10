import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class Picture extends React.Component {
  constructor (props) {
    super(props)
  }

  getPictureLink() {
    const baseUrl      = 'https://www.googleapis.com/drive/v3/files/'
    const access_token = this.props.gdrive.get('authorization').get('access_token')
    const queryParams  = `?alt=media&access_token=${access_token}`
    return `${baseUrl}${this.props.img.get('id')}${queryParams}`
  }

  render() {
    const img  = this.props.img
    const link = this.getPictureLink()
    const divStyle = {
      backgroundImage: `url(${img.get('thumbnailLink')})`
    }
    return (
      <div className="media all people">
        <a href={link}>
          <div className="thumbnail-img" style={divStyle} />
        </a>
      </div>
    );
  }
}

const mapStateToProps = ({ gdrive }) => ({ gdrive })
export default connect(mapStateToProps, {})(Picture)

