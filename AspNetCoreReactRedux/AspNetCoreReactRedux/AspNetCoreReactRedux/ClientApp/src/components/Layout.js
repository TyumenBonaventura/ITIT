import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import './style/LayoutStyle.css';
import '../../node_modules/primereact/resources/primereact.css';
import '../../node_modules/primereact/resources/themes/nova-light/theme.css';

export default props => (
    <div>
    <NavMenu />
    <Container>
      {props.children}
    </Container>
    </div>
    
);
