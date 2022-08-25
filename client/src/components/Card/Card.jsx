import React from 'react'
import { Link } from 'react-router-dom'

import s from './card.module.css'


export default function Card({ id, name, image, healthScore, diets}) {
    return (
        <Link to={`/recipes/:${id}`} className={s.cardContainer} key = {id} >
            <p className={s.cardTitle} >{name}</p>
            <div className={s.boxImage}>
                <img src={image} alt={name} />
            </div>
            <p className={s.healthScore}>HealthScore: {healthScore}</p>
            <div className={s.dietContainer}>
                {diets?.map(diet => {
                    return (
                        <p key={diet}>✔{diet}</p>
                    )
                })}
            </div>
        </Link>
    )
}

