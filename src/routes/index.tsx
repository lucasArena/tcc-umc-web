import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';
import SuccessSubmit from '../pages/SucessSubmit';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/landing" component={Landing} />
    <Route path="/profile" component={Profile} />
    <Route path="/teacher/list" component={TeacherList} />
    <Route path="/teacher/form" component={TeacherForm} />
    <Route path="/success" component={SuccessSubmit} />
  </Switch>
);

export default Routes;
