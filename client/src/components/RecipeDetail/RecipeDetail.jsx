
import { useDispatch, useSelector} from 'react-redux'
import React, {useEffect} from 'react'
import { getDetail, resetDetail } from '../../actions/index'
import { useParams } from 'react-router-dom'

export default function RecipeDetail(props) {
  let {id} = useParams()
  
  const dispatch = useDispatch()
  const detail = useSelector(state => state.detail)
  console.log(detail)
  
  useEffect(() => {
    dispatch(getDetail(id))
    return () => {
      dispatch(resetDetail())
    }
  },[dispatch,id])
  // TODO: CORREGIR ESTO DEL DETAIL, ME TRAE EL OBJETO CON LOS DATOS DE LA API, PERO NO CON EL ID DEL DB
  return (
    <div>
      <p>Hello</p>
      {detail ? 
        <div>
          <h1>{detail.name}</h1>
          <p>{detail[0].healthScore}</p>
          <img src={detail[0].image} alt="" />
          <p>{detail[0].summary}</p>
          <p>Steps</p>
          <p>{detail[0].steps}</p>
        </div>
        :
        <div>Loading...</div>}
    </div>
  )
}
