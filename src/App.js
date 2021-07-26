import React , {useEffect, useState}from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/HomePage';
import Admin from './pages/AdminPage';
import Login from './components/Login';
import Register from './components/Register';
import "./App.css"


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/admin' exact component={Admin} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
