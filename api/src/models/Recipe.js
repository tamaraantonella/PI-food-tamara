const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      //id para generar totalmente unico
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.FLOAT,
      validate:{
        min:0,
        max:100
      }
    },
    steps: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    createdInDb: {
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
