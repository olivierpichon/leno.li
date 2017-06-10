import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Nav = ({location}) => {
  const albumActive = location.pathname.startsWith("/albums")
  return (
    <nav id="nav">
      <ul>
        <li><Link className={!albumActive ? "active" : ""} to={'/'}><span className="icon fa-home"></span></Link></li>
        <li><Link className={albumActive ? "active" : ""} to={'/albums'}><span className="icon fa-camera-retro"></span></Link></li>
      </ul>
    </nav>
  )
}

export default Nav
