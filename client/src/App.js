import './App.css';
import Landing from './components/LandingPage/Landing';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Route exact path='/'>
            <Landing/>
        </Route>
        <Route path='/'>
          <Navbar/>
        </Route>
        </div>
      </BrowserRouter>
  );
}

export default App;
