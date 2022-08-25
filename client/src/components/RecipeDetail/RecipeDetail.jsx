
import { useDispatch, useSelector} from 'react-redux'
import React, {useEffect} from 'react'
import { getDetail, resetDetail } from '../../actions/index'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function RecipeDetail(props) {
  let {id} = useParams()
  
  const dispatch = useDispatch()
  const detail = useSelector(state => state.detail)
  
  useEffect(() => {
    dispatch(getDetail(id))
    return () => {
      dispatch(resetDetail())
    }
  },[dispatch,id])
  
  return (
    <div>
      <Link to='/home'><button>Go back</button></Link>
      {detail[0]?
        
          <div>
              <h1>{detail[0].name}</h1>
              <p>HealthScore: {detail[0].healthScore}</p>
              <img src={detail[0].image} alt="" />
              <p>Summary:</p>
              <div
                  dangerouslySetInnerHTML={{__html: detail[0].summary}}
                />
              <p>Steps</p>
              <p>{detail[0].steps}</p>
          </div>
          
          :
          <div>Loading...</div>
        }
    </div>
  )
}
