import React from 'react'
import { Link } from 'gatsby'

const Navbar = () => {
  return (
    <div >
      <Link  to="/" >
        Hobbes
      </Link>
      <Link  to="/project">
        Projects
      </Link>
      <Link  to="/contact">
        Contact
      </Link>
      <Link  to="/tags">
        Tags
      </Link>
    </div>
  )
}

export default Navbar
