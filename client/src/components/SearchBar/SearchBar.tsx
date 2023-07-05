import React, { ChangeEvent, FormEvent, useState } from 'react';
import s from './search-bar.module.css';
import { searchByName } from '../../actions/index';
import { useDispatch } from 'react-redux';

interface SearchBarProps {
  setShow: (arg: string) => void;
}
export const SearchBar = ({ setShow }: SearchBarProps) => {
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRecipe(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchByName(recipe));
    setRecipe('');
    setShow('loaded');
  };
  const reset = () => {
    setShow('reset');
  };

  return (
    <form
      className={s.searchContainer}
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        className={s.searchInput}
        value={recipe}
        placeholder="search"
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type="submit"
        className={s.searchButton}
        onClick={reset}
      >
        Search
      </button>
    </form>
  );
};
