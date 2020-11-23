import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import SuccessSubmit from '../pages/SucessSubmit';
import JobDetails from '../pages/JobDetails';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/landing" component={Landing} isPrivate />
    <Route path="/jobDetails" component={JobDetails} isPrivate />
    <Route path="/success" component={SuccessSubmit} isPrivate />
  </Switch>
);

export default Routes;
