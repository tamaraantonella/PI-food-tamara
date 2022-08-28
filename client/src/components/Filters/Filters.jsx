import React, {useState} from 'react'
import { filterRecipes, getRecipes, orderByHealthscore, orderByName, resetRecipes } from '../../actions/index'

import s from './filters.module.css'
import { useDispatch } from 'react-redux'

export default function Filters({setCurrentPage, setOrder,diets, setIsActive}) {
    const dispatch = useDispatch()
    //eslint-disable-next-line
    const [filter,setFilter]=useState('')

    function handleFilterDiet(e) {
        e.preventDefault()
        dispatch(filterRecipes(e.target.value))
        setCurrentPage(1)
        setIsActive(1)
    }
    
    function handleOrderByName (e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setIsActive(1)
        setOrder("Order" + e.target.value);  
        setFilter('')
    }

    function handleOrderByHealthscore (e){
        e.preventDefault()
        dispatch(orderByHealthscore(e.target.value))
        setCurrentPage(1)
        setIsActive(1)
        setOrder("Order" + e.target.value);
    }
    //handleClick para mostrar todas las recetas
    function handleClick(e) {
        e.preventDefault()
        setFilter('')
        dispatch(resetRecipes())
        dispatch(getRecipes())
        setIsActive(1)
        setOrder("")
    }
    
   
    return (
        <div className={s.filterContainer}>
            <button onClick={e => handleClick(e)} className={s.button}>Show All</button>
            <select name="" id="" className={s.filter} onChange={e=>handleOrderByName(e)}>
                <option hidden> Order by name </option>
                <option value='asc'>Ascendant</option>
                <option value='desc'>Descendant</option>
            </select>
            <select name="" id="" className={s.filter} onChange={e=>handleFilterDiet(e)}>
                <option hidden> Filter by diet </option>
                {diets.length>0 && diets.map((diet) => {return <option key = {diet.id}value={diet.name}>{diet.name}</option>})}
            </select>
            {/* filtrar por healthscore */}
            <select className={s.filter} onChange={e=>handleOrderByHealthscore(e)}>
                <option hidden> Order by healthscore </option>
                <option value='asc'>Ascendant HealthScore</option>
                <option value='desc'>Descendant HealthScore</option>
            </select>
        </div>
    )
}

