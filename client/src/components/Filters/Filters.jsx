import React from 'react'
import s from './filters.module.css'
import { filterRecipes, orderByName, orderByHealthscore} from '../../actions/index'
import { useDispatch } from 'react-redux'



export default function Filters({setCurrentPage, setOrder}) {
    const dispatch = useDispatch()
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
    return (
        <div className={s.filterContainer}>
            <select name="" id="" className={s.filter} onChange={e=>handleOrderByName(e)}>
                <option value="">Order by name</option>
                <option value='asc'>Ascendant</option>
                <option value='desc'>Descendant</option>
            </select>
            <select name="" id="" className={s.filter} onChange={e=>handleFilterDiet(e)}>
                <option value='all'>All Diets</option>
                <option value='glutenFree'>Gluten Free</option>
                <option value='ketogenic'>Ketogenic</option>
                <option value='vegetarian'>Vegetarian</option>
                <option value='lacto ovo vegetarian'>Lacto-Ovo-Vegetarian</option>
                <option value='vegan'>Vegan</option>
                <option value='pescatarian'>Pescatarian</option>
                <option value='paleolithic'>Paleo</option>
                <option value='primal'>Primal</option>
                <option value='whole 30'>Whole30</option>
                <option value='dairyFree'>Dairy Free</option>
            </select>
            {/* filtrar por healthscore */}
            <select className={s.filter} onChange={e=>handleOrderByHealthscore(e)}>
            <option value="">Order by healthscore</option>
                <option value='asc'>Ascendant HealthScore</option>
                <option value='desc'>Descendant HealthScore</option>
            </select>
        </div>
    )
}

