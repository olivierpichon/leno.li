import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { listFolder, getPreview } from '../actions/dropbox/action-creators'
import FolderList from './folder-list'

class MainView extends React.Component {
  constructor (props) {
    super(props)
  }

  static needs = [
    listFolder
  ];

  render() {
    const folders = this.props.dropbox.get("entries").get("folders")

    return (
      <div id="main-view">
        <h1>LenOli's Website</h1>

        <hr />

        <FolderList folders={ folders }/>
      </div>
    );
  }
}

const mapStateToProps = ({ dropbox }) => ({ dropbox })
const mapDispatchToProps = { listFolder, getPreview }
export default connect(mapStateToProps, mapDispatchToProps)(MainView)
