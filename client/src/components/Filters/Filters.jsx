import React, { useState } from 'react'
import { filterOrigin, filterRecipes, getRecipes, resetRecipes, sortRecipes } from '../../actions/index'

import s from './filters.module.css'
import { useDispatch } from 'react-redux'

export default function Filters({setCurrentPage, setOrder,diets, setIsActive}) {
    const dispatch = useDispatch()
    //eslint-disable-next-line
    const [filter,setFilter]=useState('')
    const [sort, setSort] = useState('')
    const [filterO, setFilterO] = useState('')
    function handleFilterDiet(e) {
        e.preventDefault()
        dispatch(filterRecipes(e.target.value))
        setCurrentPage(1)
        setIsActive(1)
        setFilter(e.target.value)
    }
    
    function handleSort (e){
        e.preventDefault()
        dispatch(sortRecipes(e.target.value))
        setCurrentPage(1)
        setIsActive(1)
        setOrder("Order" + e.target.value);
        setSort(e.target.value)  
    }
    function handleFilterOrigin(e){
        e.preventDefault()
        setFilterO(e.target.value)
        dispatch(filterOrigin(e.target.value))
        setCurrentPage(1)
        setIsActive(1)
    }
    
    //handleClick para mostrar todas las recetas
    function handleClick(e) {
        e.preventDefault()
        dispatch(resetRecipes())
        dispatch(getRecipes())
        setIsActive(1)
        setOrder("")
        setSort('')
        setFilter('')
        setFilterO('')
        
    }
    
   
    return (
        <div className={s.filterContainer}>
            <button onClick={e => handleClick(e)} className={s.button}>Clear filters</button>
            <select name="" id="" value={sort} className={s.filter} onChange={e=>handleSort(e)}>
                <option hidden> Sort recipes</option>
                <option value='asc'>Ascendant A-Z</option>
                <option value='desc'>Descendant Z-A</option>
                <option value='ascH'>Ascendant HealthScore</option>
                <option value='descH'>Descendant HealthScore</option>
            </select>
            <select name="" id="" className={s.filter} value={filter} onChange={e=>handleFilterDiet(e)}>
                <option hidden> Filter by diet </option>
                <option value='default' >All</option>
                {diets.length>0 && diets.map((diet) => {return <option key = {diet.id}value={diet.name}>{diet.name}</option>})}
            </select>
            <select value={filterO} onChange={e=>handleFilterOrigin(e)} className={s.filter} >
                <option hidden> Filter by origin </option>
                <option value='default' >All</option>
                <option value='db' >Created</option>
            </select>
        </div>
    )
}

