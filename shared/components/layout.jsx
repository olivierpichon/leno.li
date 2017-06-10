import React from 'react'
import Nav from './nav'

const Layout = ({children, location}) => {
  return (
    <div className="page-wrap">
      <Nav location={location} />
      <section id="main">
        { children }
      </section>
    </div>
  )
}

export default Layout
