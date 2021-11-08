import './App.css';
import React, { useState, useEffect } from 'react';
import {Switch,Route} from 'react-router-dom'; 
import Signup from './Signup';
import Login from './Login';
import { Container } from '@material-ui/core';



function App() {
  return (
    <>
    <Container maxwidth="md">
    <div classname="app">
      <Switch>
        <Route path="/Signup" exact component={Signup}/>
        <Route path="/Login" exact component={Login}/>

      </Switch>
    </div>
    </Container>
    </>
  );
}
export default App;
