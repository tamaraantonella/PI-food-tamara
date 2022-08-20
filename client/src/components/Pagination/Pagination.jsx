import React from 'react'
import s from './pagination.module.css'

export default function Pagination({recipesPerPage, pagination, allRecipes}) {
    const pageNumbers = [];
    for (let i = 1; i < Math.ceil(allRecipes/recipesPerPage)+1; i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <ul className={s.pagesList} >
                {pageNumbers?.map(number => {
                    return (
                        <li key={number} className={s.itemList} >
                            <a onClick={() => pagination(number)}>
                                {number}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
