import React, { PropTypes } from 'react'
import { Link } from 'react-router'

class Folder extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const folder = this.props.folder
    return (
      <div className="media">
        <Link to={`/albums/${folder.get('id')}`}>
          <div className="thumbnail album" />
          <div className="album-title">
            {folder.get('name')}
          </div>
        </Link>
      </div>
    );
  }
}

export default Folder
