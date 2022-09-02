import React, {useEffect} from 'react'
import { getDetail, resetDetail } from '../../actions/index'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import s from './recipeDetail.module.css'
import { useParams } from 'react-router-dom'

export default function RecipeDetail() {
  let {id} = useParams()
  
  const dispatch = useDispatch()
  const detail = useSelector(state => state.detail)
  const notFound = useSelector(state => state.notFound)

  
  
  useEffect(() => {
    dispatch(getDetail(id))
    return () => {
      dispatch(resetDetail())
    }
  },[dispatch,id])
  if(!notFound.error){
    return (
      <div className={s.detailContainer}> 
        {detail.length && detail[0]?
            <div key={detail[0].id}className={s.detailBox}>
              <div className={s.detailHeader}>
                <Link to='/home'><button className={s.detailButton}>Go back</button></Link>
                <h1 className={s.detailHeader_title}>{detail[0].name}</h1>
              </div>
              <p className={s.detailHealth}>HealthScore: {detail[0].healthScore}</p>
              <div className={s.detailMiddle}>
                <div className={s.detailImg}>
                  <img src={detail[0].image} alt="" />
                </div>
                <div className={s.detailDiets}>
                  <p className={s.detailHealth}>Diets</p>
                  {detail[0].diets?.map(item => {
                    return(
                      <p key={item.id} className={s.detailDiet}>
                        ✔{item}
                      </p> 
                    )
                  })}
                  {detail[0].glutenFree && !detail[0].diets.includes('gluten free') && <p>✔gluten free</p>}
                  {detail[0].vegan && !detail[0].diets.includes('vegan') && <p>✔vegan</p>}
                  {detail[0].vegetarian && !detail[0].diets.includes('vegetarian') && <p>✔vegetarian</p>}
                  {detail[0].dairyFree && !detail[0].diets.includes('dairy free') && <p>✔dairy Free</p>}
                </div>
              </div>
              <div className={s.detailSummary} >
                  <p className={s.detailHealth}>Summary</p>
                  <div
                      dangerouslySetInnerHTML={{__html: detail[0].summary}}
                    />
                  
                </div>
              <div className={s.detailSteps}>
                <p className={s.detailHealth}>Steps</p>
                <p>{detail[0].steps}</p>
                
              </div>
            </div>
            
            :
            <Loading/>
          }
      </div>
    )
  } else{
    return(
      <div className={s.detailContainer}>
        <div className={s.detailBox}>
          
          <p>No recipes found ! Please go back and try again.</p>
          <p>Error: {notFound.error}</p>
          <Link to='/home'><button className={s.detailButton}>Go back</button></Link>
        </div>
      </div>
    )
  }
  
}
