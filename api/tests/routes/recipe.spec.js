/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanesa a la napolitana',
  summary:'Milanesa con salsa, queso y tomate, al horno o frita',
  healthScore: '4',
  steps: '1. Poner a cocinar la milanesa. 2.Colocar queso y tomate. 3.Poner en el plato. 4.Comer.',
  image: 'https://www.paulinacocina.net/wp-content/uploads/2015/03/P1150541-e1439164269502.jpg',
  
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
    describe('GET /recipes', () => {
      it('should responds with 200 status', () => agent.get('/recipes').expect(200));
      it('should responds with and array and in the first position should be an object like this: {}', () =>
          agent.get('/recipes')
          .then(res => {
              expect(res.body[0].name).equal('Milanesa a la napolitana')}))           
  }); 
});
