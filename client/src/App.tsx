import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './views/home';
import { Landing } from './views/landing';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import { Form } from './views/form';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Route
          exact
          path="/"
        >
          <Landing />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route
          exact
          path="/recipes"
        >
          <Form />
        </Route>
        <Route
          exact
          path="/recipes/:id"
        >
          <RecipeDetail />
        </Route>
      </div>
    </BrowserRouter>
  );
};
