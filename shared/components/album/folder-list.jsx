import React, { PropTypes } from 'react'
import Folder from './folder'

class FolderList extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const folders = this.props.folders
    return (
      <ul className="content">
        {folders.map(folder => (
          <Folder folder={folder} key={folder.get('id')} />
        ))}
      </ul>
  );
  }
}

export default FolderList
