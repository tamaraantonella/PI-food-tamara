import { filterRecipes, getRecipes, orderByHealthscore, orderByName } from '../../actions/index'

import React from 'react'
import s from './filters.module.css'
import { useDispatch } from 'react-redux'

export default function Filters({setCurrentPage, setOrder,diets, setIsActive}) {
    const dispatch = useDispatch()

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
        dispatch(getRecipes())
        setIsActive(1)
        setOrder("new Order")
    }
    return (
        <div className={s.filterContainer}>
            <button onClick={e => handleClick(e)} className={s.button}>Show All</button>
            <select name="" id="" className={s.filter} onChange={e=>handleOrderByName(e)}>
                <option value='default'>Order by name</option>
                <option value='asc'>Ascendant</option>
                <option value='desc'>Descendant</option>
            </select>
            <select name="" id="" className={s.filter} onChange={e=>handleFilterDiet(e)}>
                {/* 
                <option value='gluten free'>Gluten Free</option>
                <option value='ketogenic'>Ketogenic</option>
                <option value='vegetarian'>Vegetarian</option>
                <option value='lacto ovo vegetarian'>Lacto-Ovo-Vegetarian</option>
                <option value='vegan'>Vegan</option>
                <option value='pescatarian'>Pescatarian</option>
                <option value='paleolithic'>Paleo</option>
                <option value='primal'>Primal</option>
                <option value='whole 30'>Whole30</option>
                <option value='dairy free'>Dairy Free</option> */}
                <option value='default'>All diets</option>
                {diets.length>0 && diets.map((diet) => {return <option key = {diet.id}value={diet.name}>{diet.name}</option>})}
            </select>
            {/* filtrar por healthscore */}
            <select className={s.filter} onChange={e=>handleOrderByHealthscore(e)}>
            <option value='default'>Order by healthscore</option>
                <option value='asc'>Ascendant HealthScore</option>
                <option value='desc'>Descendant HealthScore</option>
            </select>
        </div>
    )
}

