import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import Landing from '../pages/Landing';
import ProfileApplicant from '../pages/Profile/Applicant';
import ProfileCompany from '../pages/Profile/Company';
import SuccessSubmit from '../pages/SucessSubmit';
import JobDetails from '../pages/JobDetails';

import CompanyJobs from '../pages/Jobs';
import CompanyJobsCreate from '../pages/Jobs/Create';
import CompanyJobsUpdate from '../pages/Jobs/Update';

import CompanyApplications from '../pages/Applications';
import CompanyLanding from '../pages/CompanyLanding';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/profile/applicant" component={ProfileApplicant} isPrivate />
    <Route path="/profile/company" component={ProfileCompany} isPrivate />
    <Route path="/landing" component={Landing} isPrivate />
    <Route path="/jobDetails" component={JobDetails} isPrivate />
    <Route
      path="/company/landing"
      component={CompanyLanding}
      isPrivate
      isCompany
    />
    <Route path="/company/jobs" component={CompanyJobs} isPrivate isCompany />
    <Route
      path="/company/job/create"
      component={CompanyJobsCreate}
      isPrivate
      isCompany
    />
    <Route
      path="/company/job/edit/:jobId"
      component={CompanyJobsUpdate}
      isPrivate
      isCompany
    />

    <Route
      path="/company/applications"
      component={CompanyApplications}
      isPrivate
      isCompany
    />

    <Route path="/success" component={SuccessSubmit} isPrivate />
  </Switch>
);

export default Routes;
