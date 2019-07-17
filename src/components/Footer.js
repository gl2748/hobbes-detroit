import React from "react";
import { Link } from "gatsby";

export const Footer = () => {
  return (
    <ul>
      <li>
        <Link to="/legal">2019 (c) Hobbes</Link>
      </li>
      <li>
        <Link to="/legal">Legal Information</Link>
      </li>
      <li>
        <Link to="/cookie">Cookie Policy</Link>
      </li>
    </ul>
  );
};
