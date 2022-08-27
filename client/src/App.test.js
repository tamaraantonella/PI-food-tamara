import { render, screen } from '@testing-library/react';

import {BrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import {Provider} from 'react-redux';
import store from './store/index';

test('renders the name of the app', () => {
  render(<Provider store={store}>
    <BrowserRouter>
      <Navbar/>
      </BrowserRouter>
    </Provider>);
  const linkElement = screen.getByText('Foody App');
  expect(linkElement).toBeInTheDocument();
});

test('renders a Create recipe', () => {
  render(<Provider store={store}>
    <BrowserRouter><Navbar/></BrowserRouter>
    
</Provider>);
  const create = screen.getByText('Create recipe');
  expect(create).toBeInTheDocument();
});