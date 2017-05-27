import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import FolderList from './folder-list'
import ImgList from './img-list'

class Album extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const folders = this.props.gdrive.get('entries').get('folders')
    const imgs    = this.props.gdrive.get('entries').get('imgs')

    return (
      <div id="main-view">
        <h1>LenOli's Website</h1>

        <hr />

        <FolderList folders={ folders }/>
        <ImgList imgs={ imgs } />
      </div>
    );
  }
}

const mapStateToProps = ({ gdrive }) => ({ gdrive })
export default connect(mapStateToProps, undefined)(Album)
