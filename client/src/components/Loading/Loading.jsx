import React from 'react'
import s from './loading.module.css'
import img from '../../assets/giphy.gif'

export default function Loading() {
  return (
    <div className={s.loaderContainer}>
        <div className={s.loader}>
            <img src={img} alt="" />
        </div>
    </div>
  )
}
