import React from 'react';
import { Link } from 'gatsby';

export const Footer: React.FC = () => {
  return (
    <ul>
      <li>
        <div>2019 (c) Hobbes</div>
      </li>
      <li>
        <Link to='/legal'>Legal Information</Link>
      </li>
      <li>
        <Link to='/cookie'>Cookie Policy</Link>
      </li>
    </ul>
  );
};
