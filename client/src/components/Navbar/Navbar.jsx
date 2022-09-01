import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar'
import s from './navbar.module.css'

export default function Navbar() {
    const [show, setShow] = React.useState('')
    useEffect(() => {}, [show])
    return (
        <header className={s.headerContainer}>
            <p className={s.headerLogo} >Foody App</p>
            <Searchbar setShow={setShow} />
            <Link to='/recipes'><button className={s.headerCreate} >Create recipe</button></Link>
        </header>
    )
}
