import React from 'react'
import { Link } from 'react-router-dom'

import s from './card.module.css'


export default function Card({ id, name, image, healthScore, diets}) {
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
                </div>
                <Link to={`/recipes/:${id}`}  key = {id} >
                    <button className={s.button}>Recipe detail</button>
                </Link>
            </div>
        </div>
    )
}

