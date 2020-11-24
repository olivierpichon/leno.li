import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class Picture extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const img  = this.props.img
    const divStyle = {
      backgroundImage: `url(${img.get('thumbnailLink')})`
    }
    return (
      <div className="media all people">
        <a href='#' onClick={(e) => this.props.openLightBox(this.props.imgIndex, e)}>
          <div className="thumbnail img" style={divStyle} />
        </a>
      </div>
    );
  }
}

const mapStateToProps = ({ gdrive }) => ({ gdrive })
export default connect(mapStateToProps, {})(Picture)

