import {getDiets, getRecipes} from '../../actions/index'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import Card from '../Card/Card'
import Filters from '../Filters/Filters'
import Loading from '../Loading/Loading'
import Navbar from '../Navbar/Navbar'
import Pagination from '../Pagination/Pagination'
import React from 'react'
import s from './home.module.css'

export default function Home() {
    const dispatch = useDispatch()
    const diets = useSelector(state=>state.diets)
    const allRecipes = useSelector(state => state.recipes)
    
    // eslint-disable-next-line
    const [order, setOrder] = useState("");
    const [isActive,setIsActive] = useState(1)
    //esto es lo mismo que hacer mapStateToProps
    const [currentPage, setCurrentPage] = useState(1)
    const recipesPerPage= 9
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
        dispatch(getDiets())
    },//este array  para que no se genere un loop infinito
        [dispatch])
 
    if(allRecipes.length>0){
        return (
            <div className={s.homeContainer}>
                <Navbar/>
                
                <div className={s.homeFilter}>
                    <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} diets={diets} setIsActive={setIsActive} />
                </div>
                <Pagination
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    pagination={pagination}
                    setCurrentPage={setCurrentPage}
                    setIsActive={setIsActive}
                    isActive={isActive}
                />
                
                {/* Renderizado de las cards acorde a la pagina*/}
                <div className={s.homeList}>
                
                {currentRecipe && currentRecipe.map((recipe) => {
                        return(
                            <Card
                                key={recipe.id}
                                id={recipe.id}
                                image={recipe.image}
                                name={recipe.name}
                                healthScore={recipe.healthScore}
                                diets={recipe.diets}
                                vegetarian= {recipe.vegetarian}
                                vegan= {recipe.vegan}
                                glutenFree= {recipe.glutenFree}
                                dairyFree = {recipe.dairyFree} 
      />
                        )
                    }) 
                }
                
                </div>
            </div>
        )
    }
    else{
        return(
            <Loading/>
        )
    }
    
}
