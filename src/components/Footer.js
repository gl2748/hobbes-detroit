import React from 'react'
import { Link } from 'gatsby'

const Footer = class extends React.Component {
  render() {
    return (
      <ul className="menu-list">
        <li>
          <Link className="navbar-item" to="/legal">
            2019 (c) Hobbes
          </Link>
        </li>
        <li>
          <Link className="navbar-item" to="/legal">
            Legal Information
          </Link>
        </li>
        <li>
          <Link className="navbar-item" to="/cookie">
            Cookie Policy
          </Link>
        </li>
      </ul>
    )
  }
}

export default Footer
