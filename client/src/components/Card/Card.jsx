import React from 'react'
import s from './card.module.css'

export default function Card({ key,name, image, healthScore, diets}) {
    return (
        <div key = {key} className={s.cardContainer} >
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
    )
}

