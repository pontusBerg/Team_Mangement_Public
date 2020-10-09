import React, { useEffect, useState } from 'react';

import LoginContainer from './components/Login/Login.container';
import UserDashboardContainer from './components/Dashboard/UserDashboard.container';
import NavbarSmall from './components/Navbar/NavbarSmall';
import { startAuthUser } from './redux/user/user.actions';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import io from 'socket.io-client';
interface Props {}

let socket: any;
function App({}: Props) {
  return (
    <>
      <Router>
        <PrivateRoutes />
        <Route exact path="/login" component={LoginContainer} />
      </Router>
    </>
  );
}
export default App;
