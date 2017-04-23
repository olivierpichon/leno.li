import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { listFolder } from '../actions/dropbox/action-creators'
import FolderList from './folder-list'
import ImgList from './img-list'

class MainView extends React.Component {
  constructor (props) {
    super(props)
  }

  static needs = [
    listFolder
  ];

  render() {
    const folders = this.props.dropbox.get('entries').get('folders')
    const imgs    = this.props.dropbox.get('entries').get('imgs')

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

const mapStateToProps = ({ dropbox }) => ({ dropbox })
const mapDispatchToProps = { listFolder }
export default connect(mapStateToProps, mapDispatchToProps)(MainView)
