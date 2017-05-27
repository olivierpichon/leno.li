import React, { PropTypes } from 'react'
import { Link } from 'react-router'

class Folder extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const folder = this.props.folder
    return (
      <li><Link className="button active" to={`/${folder.get('id')}`}>{folder.get('name')}</Link></li>
    );
  }
}

export default Folder
