import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import DocTypePage from './components/DocTypePage';
import UserPage from './components/UserPage';
import EquipmentTypePage from './components/EquipmentTypePage';
import AgeCategoryPage from './components/AgeCategoryPage';
import GenderPage from './components/GenderPage';

export default () => (
    <Layout>
        <Route exact path='/' component={DocTypePage} />
        <Route exact path='/doctypes' component={DocTypePage} />
        <Route exact path='/users' component={UserPage} />
        <Route exact path='/equipmenttypes' component={EquipmentTypePage} />
        <Route exact path='/agecategories' component={AgeCategoryPage} />
        <Route exact path='/gender' component={GenderPage} />
    </Layout>
);
