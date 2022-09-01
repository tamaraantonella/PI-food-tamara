import React from 'react'
import s from './pagination.module.css'

export default function Pagination({recipesPerPage, pagination, allRecipes, setIsActive, isActive, currentPage}) {
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
                <li className={ s.itemList} onClick={currentPage > 1 ? ()=>handleClick(currentPage-1):null}>&lt;</li>
                {pageNumbers?.map(number => {
                    return (
                        <li key={number} className={(isActive=== number) ? s.active: s.itemList } onClick={() => handleClick(number)}>
                                {number}
                        </li>
                    )
                })}
                <li className={ s.itemList} onClick={currentPage < (pageNumbers.length) ? ()=>handleClick(currentPage+1):null}>&gt;</li>
            </ul>
        </div>
    )
}
