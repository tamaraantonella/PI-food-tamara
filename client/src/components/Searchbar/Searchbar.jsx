import React from 'react'
import s from './searchbar.module.css'

export default function Searchbar() {
  return (
    <div className={s.searchContainer} >
      <input type="text" className={s.searchInput} />
      <button className={s.searchButton} >Search</button>
    </div>
  )
}
