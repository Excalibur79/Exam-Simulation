import { Switch, Route } from 'react-router-dom';
import CreateExam from './Pages/ExamCreation';
// import Signup from './Pages/Login/SignUp.jsx';
// import Login from './Pages/Login/Login.jsx';

const App = () => {
  return (
    <Switch>
      {/* <Route path='/' component={ABCD} /> */}
      {/* PROJECT STARTING :) */}

      {/* <Route path="/Signup" exact component={Signup} /> */}
      {/* <Route path="/Login" exact component={Login} /> */}
      <Route path='/create-exam' component={CreateExam} />
    </Switch>
  );
};

export default App;
