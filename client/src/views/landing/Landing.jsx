import React from 'react'
import style from './landing.module.css'
import { Link } from 'react-router-dom'

export const Landing = () => {
    return (
        <div className={style.landingContainer}>
            <div className={style.landingBox}>
                <p className={style.landingText}>Welcome to</p>
                <p className={style.landingTitle} >Foody App❤</p>
                <Link to="/home"><button className={style.homeButton} >Let's cook together</button></Link>
            </div>
        </div>
    )
}
