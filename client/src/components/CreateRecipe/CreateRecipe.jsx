import {Link, useHistory} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import { getDiets, postRecipe } from '../../actions/index'
import { useDispatch, useSelector } from 'react-redux'

import s from './createRecipe.module.css'

export default function CreateRecipe() {
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector(state => state.diets)
    const [errors, setErrors]= useState({})
    const [ableToSubmit, setAbleToSubmit]= useState(true)
    const [input, setInput] = useState({
        name: '',
        summary: '',
        healthScore: 0,
        steps: '',
        image: '',
        diets:[]
    })
    //valido formulario
    function validate(input){
        let error={}
        if(!input.name || input.name.length<3){
            error.name = 'Name is required and must be at least 3 characters long'
        } 
        if(!input.summary || input.summary.length<10){
            error.summary = 'Summary is required and must be at least 10 characters long'
        } 
        if((input.healthScore) < 0 || (input.healthScore) > 100 ){
            error.healthScore = 'Healthscore must be between 0 and 100'
        }
        (!error.name&&!error.summary && !error.healthScore) ?  setAbleToSubmit(false) : setAbleToSubmit(true)
        
        return error
        
    }
    

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    const handleCheck = (e) => {
        if(e.target.checked){
            const existingDiets = input.diets.includes(e.target.name)
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
        if(Object.getOwnPropertyNames(errors).length === 0) {

            e.preventDefault()
            dispatch(postRecipe(input))
            setInput({
                name: '',
                summary: '',
                healthScore: 0,
                steps: '',
                image: '',
                diets:[]
            })
            alert('Recipe created successfully')
            //redirecciono a home con history
            history.push('/home')
         }else{ (
             alert('Please fill in all the fields'))
             setInput({
                 ...input
                })
            }
    }
    

    useEffect(() => {
        dispatch(getDiets())
    },[dispatch])  
    
  return (
    <div className={s.createContainer}>
        <div className={s.formContainer}>
            <div className={s.formHeader}>
                <h1 className={s.formTitle}>Create your own recipe</h1>
                <Link to='/home'><button className={s.button}>Go back</button></Link>
            </div>
            <form action="" className={s.form}>
                <div className={s.inputBox}>
                    <label htmlFor="name">Name </label>
                    <input type="text" name="name" id="" onChange={e=>handleChange(e)} value={input.name}/>
                    {errors.name && (
                        <p className={s.errorText}>{errors.name}</p>
                    )}
                </div>
                <div className={s.inputBox}>
                    <label htmlFor="summary">Summary </label>
                    <input type="text" name="summary" id="" onChange={e=>handleChange(e)} value={input.summary}/>
                    {errors.summary && (
                        <p className={s.errorText}>{errors.summary}</p>
                    )}
                </div>
                
                <div className={s.inputBox}>
                    <label htmlFor="healthScore">HealthScore </label>
                    <input type="number" name="healthScore" id="" onChange={e=>handleChange(e)}  maxLength='15' value={input.healthScore}/>
                    {errors.healthScore && (
                        <p className={s.errorText} >{errors.healthScore}</p>
                    )}
                </div>
                <div className={s.inputBox}>
                    <label htmlFor="steps">Steps </label>
                    <input type="text" name="steps" id="" onChange={e=>handleChange(e)} value={input.steps}/>
                </div>
                <div className={s.inputBox}>
                    <label htmlFor="image">URL Image </label>
                    <input type="text" name="image" id="" onChange={e=>handleChange(e)} value={input.image}/>
                    {errors.image && (
                        <p className={s.errorText} >{errors.image}</p>
                    )}
                </div>
                <div className={s.dietsBox}>
                    <label htmlFor="diets" className={s.dietTitle}>Diets </label>
                    <div className={s.dietContainer}>
                        {diets?.map(function(diet){
                            return(
                                <div key={diet.id} className={s.dietItem}>
                                    <input type="checkbox" name={diet.name} onClick={e=>handleCheck(e)}></input>
                                    <label>{diet.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>       
                <button className={!ableToSubmit ? s.buttonSubmit : s.buttonDisabled} disabled={ableToSubmit} type='submit' onClick={e=>handleSubmit(e)}>Create recipe</button>
            </form>
        </div>
    </div>
  )
}
