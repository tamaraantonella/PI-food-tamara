import {getDiets, getRecipes, resetRecipes} from '../../actions/index'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import Card from '../Card/Card'
import Filters from '../Filters/Filters'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import Navbar from '../Navbar/Navbar'
import Pagination from '../Pagination/Pagination'
import React from 'react'
import s from './home.module.css'

export default function Home() {
    const dispatch = useDispatch()
    const diets = useSelector(state=>state.diets)
    const allRecipes = useSelector(state => state.recipes)
    const notFound = useSelector(state => state.notFound)
    const errorServer = useSelector(state => state.errorServer)
    
    
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
        //cuando se desmonte el componente se ejecuta el return
        return ()=>{
            dispatch(resetRecipes())
        }},
        //este array  para que no se genere un loop infinito, va a escuchar a la dependencia dispatch
    [dispatch])

    
    //lo que se va a renderizar
    if(errorServer){
            return (
                <div className={s.homeContainer}>
                    <Navbar/>
                    <div className={s.errorCont}>
                        
                            <h1 className={s.errorTitle}>Server Error</h1>
                            <h3>Sorry this site can't be reached. </h3>
                            <p>Error: {errorServer}</p>
                            <p>Please try again later</p>
                            <Link to="/" className={s.errorButton}>Refresh</Link>   
                        
                    </div>
            </div>)
        } else if(!errorServer){
            return (
            
                <div className={s.homeContainer}>
                    <Navbar/>
                    
                    <div className={s.homeFilter}>
                        <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} diets={diets} setIsActive={setIsActive} />
                    </div>
                    {notFound && <div className={s.notFound}><h1 >No recipes found</h1></div>}
                    {(allRecipes.length > 0 && !notFound) && (
                        <>
                            <Pagination
                            recipesPerPage={recipesPerPage}
                            allRecipes={allRecipes.length}
                            pagination={pagination}
                            setCurrentPage={setCurrentPage}
                            setIsActive={setIsActive}
                            isActive={isActive}
                            currentPage={currentPage}
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
                                            />)
                                        })}
                            </div>
                        </>
                    )}
                    {(!notFound && allRecipes.length === 0) && <Loading/>}
                    
            
                </div>
        )
        
        }
    
        
    
}
