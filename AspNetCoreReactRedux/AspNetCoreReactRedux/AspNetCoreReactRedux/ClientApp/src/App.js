import React, { Component } from 'react';
// import { Route } from 'react-router';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/auth/Login';
import DocTypePage from './components/DocTypePage';
import UserPage from './components/UserPage';
import EquipmentPage from './components/EquipmentPage';
import EquipmentTypePage from './components/EquipmentTypePage';
import AgeCategoryPage from './components/AgeCategoryPage';
import GenderPage from './components/GenderPage';
import RolePage from './components/RolePage';
import ReservationStatusPage from './components/ReservationStatusPage';
import DayOfWeekPage from './components/DayOfWeekPage';
import RatePage from './components/RatePage';
import ReservationPage from './components/ReservationPage';
import ReservationEquipmentPage from './components/ReservationEquipmentPage';
import Home from './components/Home';
import Staff from './components/Staff';
import './App.css';

function onAuthRequired({ history }) {
  history.push('/login');
}

export default () => (
    <Router>
        <Security issuer='https://yandexitit2019.okta.com/oauth2/default'
          client_id='0oat8nwjeNviWnqmn4x5'
          redirect_uri={window.location.origin + '/implicit/callback'}
          onAuthRequired={onAuthRequired}
        >
            <Route
                path="/login"
                render={() => (
                    <Login baseUrl='https://yandexitit2019.okta.com' />
                )}
            />
            <Layout>
                <SecureRoute path="/home" exact={true} component={Home} />
                <SecureRoute path="/" exact={true} component={Staff} />
                <SecureRoute exact={true} path='/doctypes' component={DocTypePage} />
                <SecureRoute exact={true} path='/users' component={UserPage} />
                <SecureRoute exact={true} path='/equipment' component={EquipmentPage} />
                <SecureRoute exact={true} path='/equipment_types' component={EquipmentTypePage} />
                <SecureRoute exact={true} path='/age_categories' component={AgeCategoryPage} />
                <SecureRoute exact={true} path='/gender' component={GenderPage} />
                <SecureRoute exact={true} path='/role' component={RolePage} />
                <SecureRoute exact={true} path='/reservation_status' component={ReservationStatusPage} />
                <SecureRoute exact={true} path='/day_of_week' component={DayOfWeekPage} />
                <SecureRoute exact={true} path='/rate' component={RatePage} />
                <SecureRoute exact={true} path='/reservation' component={ReservationPage} />
                <SecureRoute exact={true} path='/reservation_equipment' component={ReservationEquipmentPage} />
                <Route path='/implicit/callback' component={ImplicitCallback} />
            </Layout>



        </Security>
    </Router>
);

