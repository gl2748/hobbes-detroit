import React from 'react'
import { Link } from 'gatsby'

export const Navbar = () => {
  return (
    <div>
      <div>
        <Link to="/">Hobbes</Link>
      </div>
      <div>
        <Link to="/project">Projects</Link>
      </div>
      <div>
        <Link to="/contact">Contact</Link>
      </div>
      <div>
        <Link to="/tags">Tags</Link>
      </div>
    </div>
  )
}
