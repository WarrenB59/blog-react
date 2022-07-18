import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Router from './Router/Router';
import configureStore from './redux/store';

const App = () => {
  return (
    <div>
      <Provider store={configureStore()}>
        <BrowserRouter>
          <Navigation/>
          <Router/>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
