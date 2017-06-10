import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Nav = () => {
  return (
    <nav id="nav">
      <ul>
        <li><Link className="active" to={'/'}><span className="icon fa-home"></span></Link></li>
        <li><Link to={'/albums'}><span className="icon fa-camera-retro"></span></Link></li>
        <li><a href="generic.html"><span className="icon fa-file-text-o"></span></a></li>
      </ul>
    </nav>
  )
}

export default Nav
