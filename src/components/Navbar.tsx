import { Link } from "gatsby"
import React from "react"

export const Navbar: React.FC = () => {
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
