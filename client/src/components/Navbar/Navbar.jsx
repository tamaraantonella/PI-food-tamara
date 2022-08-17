import React from 'react'
import s from './navbar.module.css'
import Searchbar from '../Searchbar/Searchbar'

export default function Navbar() {
    return (
        <header className={s.headerContainer}>
            <p className={s.headerLogo} >Foody App</p>
            <div className={s.headerItems}>
                <Searchbar />
                <div className={s.headerFilters}>
                    <p>Filtros</p>
                    <p>Filtros</p>
                    <p>Filtros</p>
                </div>

            </div>

        </header>
    )
}
