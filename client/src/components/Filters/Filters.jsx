import React from 'react'
import s from './filters.module.css'
import { filterRecipes, orderByName, orderByHealthscore, getRecipes} from '../../actions/index'
import { useDispatch } from 'react-redux'
import { useState } from 'react'



export default function Filters({setCurrentPage, setOrder, }) {
    const dispatch = useDispatch()
    // eslint-disable-next-line
    const [reset,setReset] = useState('')

    function handleFilterDiet(e) {
        e.preventDefault()
        dispatch(filterRecipes(e.target.value))
        setCurrentPage(1)
    }
    
    function handleOrderByName (e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder("Order" + e.target.value);
    }

    function handleOrderByHealthscore (e){
        e.preventDefault()
        dispatch(orderByHealthscore(e.target.value))
        setCurrentPage(1)
        setOrder("Order" + e.target.value);
    }
    function resetFilters (e){
        e.preventDefault()
        dispatch(filterRecipes('default'))
        dispatch(orderByName('default'))
        dispatch(orderByHealthscore('default'))
        setCurrentPage(1)
        setOrder("");
    }
       //handleClick para mostrar todas las recetas
       function handleClick(e) {
        e.preventDefault()
        dispatch(getRecipes())
        setOrder("new Order")
        resetFilters(e)
        setReset('default')
    }
    return (
        <div className={s.filterContainer}>
            <button onClick={e => handleClick(e)} className={s.button}>Show All</button>
            <select name="" id="" className={s.filter} onChange={e=>handleOrderByName(e)}>
                <option value={reset}>Order by name</option>
                <option value='asc'>Ascendant</option>
                <option value='desc'>Descendant</option>
            </select>
            <select name="" id="" className={s.filter} onChange={e=>handleFilterDiet(e)}>
                <option value={reset}>Filter by diet</option>
                <option value='all'>All Diets</option>
                <option value='gluten free'>Gluten Free</option>
                <option value='ketogenic'>Ketogenic</option>
                <option value='vegetarian'>Vegetarian</option>
                <option value='lacto ovo vegetarian'>Lacto-Ovo-Vegetarian</option>
                <option value='vegan'>Vegan</option>
                <option value='pescatarian'>Pescatarian</option>
                <option value='paleolithic'>Paleo</option>
                <option value='primal'>Primal</option>
                <option value='low fodmap'>Low Fodmap</option>
                <option value='whole 30'>Whole30</option>
                <option value='dairy free'>Dairy Free</option>
            </select>
            {/* filtrar por healthscore */}
            <select className={s.filter} onChange={e=>handleOrderByHealthscore(e)}>
            <option value={reset}>Order by healthscore</option>
                <option value='asc'>Ascendant HealthScore</option>
                <option value='desc'>Descendant HealthScore</option>
            </select>
        </div>
    )
}

