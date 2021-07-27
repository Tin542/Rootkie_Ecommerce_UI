import React , {useEffect, useState}from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/HomePage';
import Admin from './pages/AdminPage';
import User from './pages/UserPage';
import Login from './components/Login';
import Register from './components/Register';
import Category from './components/admin/Category';
import "./App.css"


function App() {
  return (
    <>
      <Router>
        
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/user' exact component={User} />
          <Route path='/admin' exact component={Admin} />
          <Route path='/product' exact component={Admin} />
          <Route path='/category' exact component={Category} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
