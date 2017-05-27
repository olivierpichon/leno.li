import React, { PropTypes } from 'react'

const Nav = () => {
  return (
    <div>
      <nav id="nav">
        <ul>
          <li><a href="index.html" className="active"><span className="icon fa-home"></span></a></li>
          <li><a href="gallery.html"><span className="icon fa-camera-retro"></span></a></li>
          <li><a href="generic.html"><span className="icon fa-file-text-o"></span></a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
