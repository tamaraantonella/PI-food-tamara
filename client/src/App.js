import './App.css';
import Landing from './components/LandingPage/Landing';

import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';


function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Route exact path='/'>
            <Landing/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route exact path='/recipes'>
          <CreateRecipe/>
        </Route>
        </div>
      </BrowserRouter>
  );
}

export default App;
