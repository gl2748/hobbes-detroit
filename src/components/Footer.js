import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'

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
