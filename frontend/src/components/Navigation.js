import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/log">Log</Link>
        <Link to="/topics">Topics</Link>
    </nav>
  );
}

export default Navigation;
