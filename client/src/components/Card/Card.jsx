import React from 'react'

export default function Card({ name, image, healthScore, diets}) {
    return (
        <div>
            <p>{name}</p>
            <p>HealthScore {healthScore
            }</p>
            <img src={image} alt={name} />
            {diets?.map(diet => {
                return (
                    <p key={diet}>{diet}</p>
                )
            })}
        </div>
    )
}
