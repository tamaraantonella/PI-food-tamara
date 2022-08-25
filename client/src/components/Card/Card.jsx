import React from 'react'
import { Link } from 'react-router-dom'

import s from './card.module.css'


export default function Card({ id, name, image, healthScore, diets}) {
    return (
        <Link to={`/recipes/:${id}`}>
            <div key = {id} className={s.cardContainer} >
                <p className={s.cardTitle} >{name}</p>
                <img src={image} alt={name} />
                <p>HealthScore: {healthScore}</p>
                <div className={s.dietContainer}>
                    {diets?.map(diet => {
                        return (
                            <p key={diet}>{diet}</p>
                        )
                    })}
                </div>
            </div>
        </Link>
    )
}

