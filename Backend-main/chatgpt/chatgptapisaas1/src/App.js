import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import SecondPage from './SecondPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/second-page">Second Page</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <div>
              <h1>Anasayfa</h1>
            </div>
          </Route>
          <Route path="/second-page">
            <SecondPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;