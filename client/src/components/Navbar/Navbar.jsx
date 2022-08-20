import React from 'react'
import s from './navbar.module.css'
import Searchbar from '../Searchbar/Searchbar'
import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        <header className={s.headerContainer}>
            <p className={s.headerLogo} >Foody App</p>
            <Searchbar />
            <Link to='/recipes'><button className={s.headerCreate} >Create recipe</button></Link>
        </header>
    )
}
