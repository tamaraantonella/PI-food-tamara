import React from 'react'
import style from './landing.module.css'

export default function Landing() {
    return (
        <div className={style.landingContainer}>
            <div className={style.landingBox}>
                <p className={style.landingTitle}>Welcome to Foody App</p>
                <p className={style.landingText} >You can find all recipies you need ❤</p>
                <button className={style.homeButton} >Let's cook together</button>
            </div>
        </div>
    )
}
