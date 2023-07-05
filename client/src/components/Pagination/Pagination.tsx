import React from 'react';
import s from './pagination.module.css';

interface PaginationProps {
  recipesPerPage: number;
  pagination: (number: number) => void;
  allRecipes: number;
  setIsActive: (number: number) => void;
  isActive: number;
  currentPage: number;

}

export const Pagination = ({
  recipesPerPage,
  pagination,
  allRecipes,
  setIsActive,
  isActive,
  currentPage
}: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(allRecipes / recipesPerPage) + 1; i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number: number) => {
    pagination(number);
    setIsActive(number);
  };

  return (
    <div className={s.pageContainer}>
      <ul className={s.pagesList}>
        {currentPage > 1 && (
          <li
            className={s.itemList}
            onClick={
              currentPage > 1 ? () => handleClick(currentPage - 1) : undefined
            }
          >
            &lt;
          </li>
        )}
        {pageNumbers?.map((number) => {
          return (
            <li
              key={number}
              className={isActive === number ? s.active : s.itemList}
              onClick={() => handleClick(number)}
            >
              {number}
            </li>
          );
        })}
        {currentPage < pageNumbers.length && (
          <li
            className={s.itemList}
            onClick={
              currentPage < pageNumbers.length
                ? () => handleClick(currentPage + 1)
                : undefined
            }
          >
            &gt;
          </li>
        )}
      </ul>
    </div>
  );
};
