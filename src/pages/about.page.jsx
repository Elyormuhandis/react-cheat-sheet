import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const About = () => {
  return (
    <div>
      <h3>About us</h3>
      <ul style={{ marginBottom: '2rem' }}>
        <li>
          <Link to='team'>TEAM</Link>
        </li>
        <li>
          <Link to='contacts'>CONTACTS</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
