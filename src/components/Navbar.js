import React from 'react'
import { Link } from 'gatsby'

const Navbar = () => {
  return (
    <div className="navbar-brand">
      <Link className="navbar-item" to="/" >
        Hobbes
      </Link>
      <Link className="navbar-item" to="/project">
        Projects
      </Link>
      <Link className="navbar-item" to="/contact">
        Contact
      </Link>
    </div>
  )
}

export default Navbar
