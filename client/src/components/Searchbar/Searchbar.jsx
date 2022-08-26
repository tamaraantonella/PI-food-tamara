import React, {useState} from 'react'
import s from './searchbar.module.css'
import {searchByName} from '../../actions/index'
import {useDispatch} from 'react-redux'


export default function Searchbar() {
    const dispatch = useDispatch()
    const [recipe, setRecipe] = useState('')

    function handleInputChange(e) {
      e.preventDefault()
      setRecipe(e.target.value)
    }
    function handleSubmit(e) {
      e.preventDefault()
      dispatch(searchByName(recipe))
      setRecipe('')
    }

  return (
    <div className={s.searchContainer} >
      <input type="text" className={s.searchInput}  onChange={e=>handleInputChange(e)} />
      <button type='submit' className={s.searchButton} onClick={e=>handleSubmit(e)}>Search</button>
    </div>
  )
}
