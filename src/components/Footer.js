import React from 'react'
import { Link } from 'gatsby'

const Footer = class extends React.Component {
  render() {
    return (
      <ul >
        <li>
          <Link  to="/legal">
            2019 (c) Hobbes
          </Link>
        </li>
        <li>
          <Link  to="/legal">
            Legal Information
          </Link>
        </li>
        <li>
          <Link  to="/cookie">
            Cookie Policy
          </Link>
        </li>
      </ul>
    )
  }
}

export default Footer
