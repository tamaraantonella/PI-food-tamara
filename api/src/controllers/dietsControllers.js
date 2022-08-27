const axios = require("axios");
const { Diet } = require("../db");


const addDietsToDB = async () => {
    const dietsArray =[{name:'gluten free'},{name: 'ketogenic'}, {name: 'vegetarian'}, {name:'lacto ovo vegetarian'}, {name:'vegan'}, {name:'pescatarian'}, {name:'paleolithic'}, {name:'primal'}, {name:'whole 30'}, {name:'dairy free'}] 
    try {
        const lista = await Diet.bulkCreate(dietsArray) ;
        return lista
    } catch (error) {
        console.log(error)
    }
}
const getAllDiets = async () => {
    try { 
        
        const arrayDiets = await Diet.findAll();
        arrayDiets.length ===0 && await addDietsToDB();
        return arrayDiets;
    } catch (error) {
        console.log(error)
        
    }
}

module.exports={
    getAllDiets
} 