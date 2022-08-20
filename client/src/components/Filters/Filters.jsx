import React, { useEffect } from 'react'
import s from './filters.module.css'
import { filterRecipes } from '../../actions/index'
import { useDispatch, useSelector } from 'react-redux'



export default function Filters() {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(filterRecipes())
    }, [dispatch])

    function handleFilterDiet(e) {
        e.preventDefault()
        dispatch(filterRecipes(e.target.value))
    }
    return (
        <div>
            <select name="" id="" className={s.filter}>
                <option value='asc'>Ascendant</option>
                <option value='desc'>Descendant</option>
            </select>
            <select name="" id="" className={s.filter} onChange={e=>handleFilterDiet(e)}>
                <option value='all'>All</option>
                <option value='Gluten Free'>Gluten Free</option>
                <option value='Ketogenic'>Ketogenic</option>
                <option value='Vegetarian'>Vegetarian</option>
                <option value='Lacto-Vegetarian'>Lacto-Vegetarian</option>
                <option value='Ovo-Vegetarian'>Ovo-Vegetarian</option>
                <option value='Vegan'>Vegan</option>
                <option value='Pescetarian'>Pescetarian</option>
                <option value='Paleo'>Paleo</option>
                <option value='Primal'>Primal</option>
                <option value='Low FODMAP'>Low FODMAP</option>
                <option value='Whole30'>Whole30</option>
            </select>
        </div>
    )
}
