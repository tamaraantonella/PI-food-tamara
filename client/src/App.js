import './App.css';
import Landing from './components/LandingPage/Landing';

import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home/Home';

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
        </div>
      </BrowserRouter>
  );
}

export default App;
