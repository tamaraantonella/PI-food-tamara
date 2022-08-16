import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/LandingPage/Landing';

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Landing />
      </Route>
    </div>
  );
}

export default App;
