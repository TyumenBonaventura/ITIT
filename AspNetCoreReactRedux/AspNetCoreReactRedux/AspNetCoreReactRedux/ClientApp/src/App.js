import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import DocTypeList from './components/DocTypeList';
import UserList from './components/UserList';

export default () => (
  <Layout>
        <Route exact path='/doctypes' component={DocTypeList} />
        <Route exact path='/users' component={UserList} />
  </Layout>
);
