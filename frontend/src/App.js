
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateExam from './Pages/ExamCreation/ExamCreation.jsx';

const App = () => {
  return (
    <Switch>
      {/* <Route path='/' component={ABCD} /> */}
      {/* PROJECT STARTING :) */}
      <Route path="/create-exam" component={CreateExam} />

    </Switch>
  );
};

export default App;
