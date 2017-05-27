import React, { PropTypes } from 'react'
import { listFolder } from '../actions/gdrive/action-creators'
import Nav from './nav'
import Album from './album'

class Page extends React.Component {
  constructor (props) {
    super(props)
  }

  static needs = [
    listFolder
  ];

  render() {
    return (
      <div className="page-wrap">
        <Nav />
        <Album />
      </div>
    )
  }
}

export default Page
