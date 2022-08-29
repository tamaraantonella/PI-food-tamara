import { filterRecipes, getRecipes, resetRecipes, sortRecipes } from '../../actions/index'

import React from 'react'
import s from './filters.module.css'
import { useDispatch } from 'react-redux'

export default function Filters({setCurrentPage, setOrder,diets, setIsActive}) {
    const dispatch = useDispatch()
    //eslint-disable-next-line

    function handleFilterDiet(e) {
        e.preventDefault()
        dispatch(filterRecipes(e.target.value))
        setCurrentPage(1)
        setIsActive(1)
    }
    
    function handleSort (e){
        e.preventDefault()
        dispatch(sortRecipes(e.target.value))
        setCurrentPage(1)
        setIsActive(1)
        setOrder("Order" + e.target.value);  
    }

    
    //handleClick para mostrar todas las recetas
    function handleClick(e) {
        e.preventDefault()
        dispatch(resetRecipes())
        dispatch(getRecipes())
        setIsActive(1)
        setOrder("")
    }
    
   
    return (
        <div className={s.filterContainer}>
            <button onClick={e => handleClick(e)} className={s.button}>Clear filters</button>
            <select name="" id="" className={s.filter} onChange={e=>handleSort(e)}>
                <option hidden> Sort recipes</option>
                <option value='asc'>Ascendant A-Z</option>
                <option value='desc'>Descendant Z-A</option>
                <option value='ascH'>Ascendant HealthScore</option>
                <option value='descH'>Descendant HealthScore</option>
            </select>
            <select name="" id="" className={s.filter} onChange={e=>handleFilterDiet(e)}>
                <option hidden> Filter by diet </option>
                {diets.length>0 && diets.map((diet) => {return <option key = {diet.id}value={diet.name}>{diet.name}</option>})}
            </select>
            
        </div>
    )
}

