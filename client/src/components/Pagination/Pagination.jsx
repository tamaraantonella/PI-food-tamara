import React from 'react'
import s from './pagination.module.css'

export default function Pagination({recipesPerPage, pagination, allRecipes, setIsActive, isActive}) {
    const pageNumbers = [];
    for (let i = 1; i < Math.ceil(allRecipes/recipesPerPage)+1; i++) {
        pageNumbers.push(i);
    }
     // eslint-disable-next-line
    
    const handleClick = (number) => {
        pagination(number)
        setIsActive(number)
    }
    return (
        <div className={s.pageContainer}>
            <ul className={s.pagesList} >
                {pageNumbers?.map(number => {
                    return (
                        <li key={number} className={(isActive=== number) ? s.active: s.itemList } onClick={() => handleClick(number)}>
                                {number}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
