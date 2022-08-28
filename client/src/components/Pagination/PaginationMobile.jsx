import React, {useState} from 'react'

import s from './pagination.module.css'
import { useEffect } from 'react';

export default function Pagination({recipesPerPage, pagination, allRecipes}) {
    const pageNumbers = [];
    for (let i = 1; i < Math.ceil(allRecipes/recipesPerPage)+1; i++) {
        pageNumbers.push(i);
    }
    
     // eslint-disable-next-line
    const [page,setPage] = useState(1)
    const handleArrowNext = ()=> {
        if(page < pageNumbers.length){
            setPage(page+1)
            pagination(page)
        }
    }
    const handleArrowLess = ()  => {
        if(page > 1){
            setPage(page-1)
            pagination(page)
        }  
    }
    useEffect(() => {
        pagination(page)
    }, [])
    
    return (
        <div className={s.pageContainerMobile}>       
            <ul className={s.pagesListMobile} >
                <li onClick={()=>handleArrowLess()}>Previous</li>
                <li key={page}>{page} </li>
                <li onClick={()=>handleArrowNext()} >Next</li>
            </ul>
        </div>
    )
}
