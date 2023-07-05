import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import s from './navbar.module.css';

export const Navbar = () => {
  const [show, setShow] = React.useState('');
  useEffect(() => {}, [show]);

  return (
    <header className={s.headerContainer}>
      <p className={s.headerLogo}>Foody App</p>
      <SearchBar setShow={setShow} />
      <Link to="/recipes">
        <button className={s.headerCreate}>Create recipe</button>
      </Link>
    </header>
  );
};
