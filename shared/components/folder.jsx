import React, { PropTypes } from 'react'
import { Link } from 'react-router'

class Folder extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const folder = this.props.folder
    return (
      <div>
        <Link to={`/${folder.get('id')}`}>{folder.get('name')}</Link>
      </div>
    );
  }
}

export default Folder
