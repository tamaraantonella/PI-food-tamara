import { Link } from 'react-router-dom'
import React from 'react'
import s from './card.module.css'

export const Card = ({ id, name, image, healthScore, diets, glutenFree, vegetarian, vegan, dairyFree }) => {
    return (
        <div className={s.cardContainer}>
            <div className={s.boxImage}>
                <img src={image} alt={name} />
            </div>
            <div className={s.cardDescription}>
                <p className={s.cardTitle} >{name}</p>
                <p className={s.healthScore}>HealthScore: {healthScore}</p>
                <div className={s.dietContainer}>
                        {diets?.map(diet => {
                            return (
                                <p key={diet}>✔{diet}</p>
                            )
                        })}
                        {glutenFree && !diets.includes('gluten free') && <p>✔gluten free</p>}
                        {vegan && !diets.includes('vegan') && <p>✔vegan</p>}
                        {vegetarian && !diets.includes('vegetarian') && <p>✔vegetarian</p>}
                        {dairyFree && !diets.includes('dairy free') && <p>✔dairy Free</p>}
                </div>
                <Link to={`/recipes/${id}`}  key = {id} >
                    <button className={s.button}>Recipe detail</button>
                </Link>
            </div>
        </div>
    )
}

