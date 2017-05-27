import React, { PropTypes } from 'react'
import Folder from './folder'

class FolderList extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const folders = this.props.folders
    return (
      <div className="folder-list">
        <ul className="tabs">
          {folders.map(folder => (
            <Folder folder={folder} key={folder.get('id')} />
          ))}
        </ul>
      </div>
  );
  }
}

export default FolderList
