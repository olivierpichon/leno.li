import React from 'react'
import Nav from './nav'

const Layout = ({children}) => {
  return (
    <div className="page-wrap">
      <Nav />
      <section id="main">
        { children }
      </section>
    </div>
  )
}

export default Layout
