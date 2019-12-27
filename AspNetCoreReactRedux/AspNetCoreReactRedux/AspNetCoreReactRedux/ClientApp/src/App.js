import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import DocTypePage from './components/DocTypePage';
import UserPage from './components/UserPage';
import EquipmentTypePage from './components/EquipmentTypePage';
import AgeCategoryPage from './components/AgeCategoryPage';
import GenderPage from './components/GenderPage';
import RolePage from './components/RolePage';
import ReservationStatusPage from './components/ReservationStatusPage';

export default () => (
    <Layout>
        <Route exact path='/' component={DocTypePage} />
        <Route exact path='/doctypes' component={DocTypePage} />
        <Route exact path='/users' component={UserPage} />
        <Route exact path='/equipment_types' component={EquipmentTypePage} />
        <Route exact path='/age_categories' component={AgeCategoryPage} />
        <Route exact path='/gender' component={GenderPage} />
        <Route exact path='/role' component={RolePage} />
        <Route exact path='/reservation_status' component={ReservationStatusPage} />
    </Layout>
);
