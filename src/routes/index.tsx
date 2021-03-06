import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Landing from '../pages/Landing';
import ProfileApplicant from '../pages/Profile/Applicant';
import ProfileCompany from '../pages/Profile/Company';
import ProfileAdmin from '../pages/Profile/Admin';
import SuccessSubmit from '../pages/SucessSubmit';
import JobDetails from '../pages/JobDetails';

import Packages from '../pages/Packages';

import CompanyJobs from '../pages/Jobs';
import CompanyJobsCreate from '../pages/Jobs/Create';
import CompanyJobsUpdate from '../pages/Jobs/Update';

import CompanyApplications from '../pages/Applications';
import CompanyLanding from '../pages/CompanyLanding';

import UserApplications from '../pages/UserApplications';

import Report from '../pages/Admin/Report';
import AdminPackage from '../pages/Admin/Package';
import AdminPackageCreate from '../pages/Admin/Package/Create';
import AdminPackageUpdate from '../pages/Admin/Package/Update';

import NotAllow from '../pages/NotAllow';
import AdminPayment from '../pages/Admin/Payment';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route
      path="/profile/applicant"
      component={ProfileApplicant}
      isPrivate
      isTopHeader
      isApplicant
    />
    <Route
      path="/profile/company"
      component={ProfileCompany}
      isPrivate
      isTopHeader
      isCompany
    />
    <Route
      path="/profile/admin"
      component={ProfileAdmin}
      isPrivate
      isTopHeader
      isAdmin
    />
    <Route path="/landing" component={Landing} isPrivate />
    <Route path="/jobDetails" component={JobDetails} isPrivate isApplicant />

    <Route
      path="/packages"
      component={Packages}
      isPrivate
      isTopHeader
      isApplicant
    />

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

    <Route
      path="/applicant/applications"
      component={UserApplications}
      isPrivate
    />

    <Route
      path="/users/applications"
      component={UserApplications}
      isPrivate
      isApplicant
    />

    <Route exact path="/admin/reports" component={Report} isPrivate isAdmin />

    <Route
      exact
      path="/admin/packages"
      component={AdminPackage}
      isPrivate
      isAdmin
    />
    <Route
      path="/admin/package/create"
      component={AdminPackageCreate}
      isPrivate
      isAdmin
    />
    <Route
      path="/admin/package/edit/:packageId"
      component={AdminPackageUpdate}
      isPrivate
      isAdmin
    />

    <Route path="/admin/payment/" component={AdminPayment} isPrivate isAdmin />

    <Route path="/not-allow" component={NotAllow} isPrivate />
    <Route path="/success" component={SuccessSubmit} isPrivate />
  </Switch>
);

export default Routes;
