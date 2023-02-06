import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header>
        <NavLink
          style={({ isActive }) => ({ color: isActive ? 'green' : '' })}
          to='/'>
          Home
        </NavLink>
        <NavLink
          to='/blog'
          className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Blog
        </NavLink>
        <NavLink to='/about'>About</NavLink>
      </header>
      <main>
        <h3>Get started with React-Router6</h3>
        <Outlet />
      </main>
      <aside>Aside</aside>
      <footer>footer</footer>
    </>
  );
};
