import React from 'react'
import s from './home.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getRecipes} from '../../actions/index'
import Filters from '../Filters/Filters'
import Card from '../Card/Card'
import Navbar from '../Navbar/Navbar'
import Pagination from '../Pagination/Pagination'

export default function Home() {
    const dispatch = useDispatch()
    //esto es lo mismo que hacer mapStateToProps
    const allRecipes = useSelector(state => state.recipes)
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    //cuales son las recetas a generar de acuerdo a la pagina actual
    const currentRecipe= allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        //lo mismo que hacer mapDispatchToProps
        dispatch(getRecipes())
    },//este array  para que no se genere un loop infinito
        [dispatch])
    //handleClick para mostrar todas las recetas
    function handleClick(e) {
        e.preventDefault()
        dispatch(getRecipes())
    }
    return (
        <div className={s.homeContainer}>
            <Navbar/>
            <div className={s.homeFilter}>
                <button onClick={e => handleClick(e)} className={s.button}>Show All</button>
                <Filters/>
            </div>
            <Pagination
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                pagination={pagination}
            />
            {/* Renderizado de las cards */}
            <div className={s.homeList}>
            {currentRecipe && currentRecipe.map((recipe) => {
                    return(
                        <Card
                            key={recipe.id}
                            image={recipe.image}
                            name={recipe.name}
                            healthScore={recipe.healthScore}
                            diets={recipe.diets} />
                    )
                })
            }
            </div>
        </div>
    )
}
