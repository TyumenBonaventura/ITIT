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
import DayOfWeekPage from './components/DayOfWeekPage';
import RatePage from './components/RatePage';

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
        <Route exact path='/day_of_week' component={DayOfWeekPage} />
        <Route exact path='/rate' component={RatePage} />
    </Layout>
);
