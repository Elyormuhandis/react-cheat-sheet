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
          to='/posts'
          className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Posts
        </NavLink>
        <NavLink to='/goods'>Goods</NavLink>
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
