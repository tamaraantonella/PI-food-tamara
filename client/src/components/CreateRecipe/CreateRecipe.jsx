import React, {useState, useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import { getDiets,postRecipe } from '../../actions/index'
import { useDispatch, useSelector} from 'react-redux'

export default function CreateRecipe() {
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector(state => state.diets)
    const [input, setInput] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        steps: '',
        image: '',
        diets:[]
    })
    
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleCheck = (e) => {
        if(e.target.checked){
            const existingDiets = input.diets.includes(e.target.name)
            console.log(existingDiets)
            if(!existingDiets){
            setInput({
                ...input,
                diets: [...input.diets, e.target.name]
            })
        }} else if(!e.target.checked){
            const deleteDiets = input.diets.filter(diet => diet !== e.target.name)
            setInput({
                ...input,
                diets: deleteDiets
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postRecipe(input))
        alert('Recipe created')
        setInput({
            name: '',
            summary: '',
            healthScore: 0,
            steps: '',
            image: '',
            diets:[]
        })
        //redirecciono a home con history
        history.push('/home')
    }
    
    function validate(input){
        let error={}
        if(!input.name){
            error.name = 'Name is required'
        }
    }
    
    useEffect(() => {
        dispatch(getDiets())
    },[])
    
    
    
  return (
    <div>
        <Link to='/home'><button>Go back</button></Link>
        <h1>Create your own recipe!</h1>
        <form action="">
            <div>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="" onClick={e=>handleChange(e)} value={input.name}/>
            </div>
            <div>
                <label htmlFor="summary">Summary: </label>
                <input type="text" name="summary" id="" onClick={e=>handleChange(e)} value={input.summary}/>
            </div>
            <div>
                <label htmlFor="healthScore">HealthScore: </label>
                <input type="number" name="healthScore" id="" onClick={e=>handleChange(e)} value={input.healthScore}/>
            </div>
            <div>
                <label htmlFor="steps">Steps: </label>
                <input type="text" name="steps" id="" onClick={e=>handleChange(e)} value={input.steps}/>
            </div>
            <div>
                <label htmlFor="image">URL Image: </label>
                <input type="text" name="image" id="" onClick={e=>handleChange(e)} value={input.image}/>
            </div>
            <div>
                <label htmlFor="diets">Diets: </label>
                {diets?.map(function(diet){
                    return(
                        <div key={diet.id}>
                            <label>{diet.name}</label>
                            <input type="checkbox" name={diet.name} onClick={e=>handleCheck(e)}></input>
                        </div>
                    )
                })}
            </div>       
    <button type='submit' onClick={e=>handleSubmit(e)}>Create recipe</button>
        </form>
    </div>
  )
}
