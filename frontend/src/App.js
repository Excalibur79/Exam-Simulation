import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import CREATE_EXAM from './Pages/ExamCreation/ExamCreation.jsx';

const App = () => {
  return (
    <Switch>
      {/* <main > */}
      {/* <Route path='/' component={ABCD} /> */}
      PROJECT STARTING :)
      <Route path="/" component={CREATE_EXAM} />
      {/* </main> */}
    </Switch>
  );
};

export default App;
