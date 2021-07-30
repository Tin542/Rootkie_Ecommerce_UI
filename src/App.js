import React , {useEffect, useState}from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/HomePage';
import Admin from './pages/AdminPage';
import User from './pages/UserPage';
import Login from './components/Login';
import Register from './components/Register';
import Category from './components/admin/Category';
import Publisher from './components/admin/Publisher';
import Author from './components/admin/Author';
import AddProduct from './components/admin/AddProduct';
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
          <Route path='/addProduct' exact component={AddProduct} />
          <Route path='/category' exact component={Category} />
          <Route path='/publisher' exact component={Publisher} />
          <Route path='/author' exact component={Author} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
