import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import SideNav, { MenuIcon } from 'react-simple-sidenav';
import './style/NavMenu.css';
import './style/SideMenu.css';

export default class NavMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          //  isOpen: false,
            showNav: false,
         //   onHideNav: true
        };
    }
    toggle() {
        this.setState({
            showNav: !this.state.showNav,
         //   onHideNav: !this.state.onHideNav
        });
    }
    render() {
        return (
                <React.Fragment>
                <meta charset="UTF-8"></meta>
                <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light >
                    <Container>
                            <MenuIcon id="menuIcon" onClick={() => { this.toggle() }} />
                            <span>&nbsp;&nbsp;</span>
                            <span>&nbsp;&nbsp;</span>
                            <span>&nbsp;&nbsp;</span>
                            <img width="45px" height="45px" src="https://i.ibb.co/d0jFBnb/2019-06-12-21-42-05.png" />
                            <span>&nbsp;&nbsp;</span>
                         <NavbarBrand onClick={() => this.setState({ showNav: false })} tag={Link} to="/">SnowMaster</NavbarBrand>
                        <NavbarToggler className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" /*isOpen={this.state.isOpen}*/ navbar>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
                <SideNav
                    showNav={this.state.showNav}
                    onHideNav={() => this.setState({ showNav: false })}
                    title=" "
                    items={[
                        <NavLink onClick={() => this.setState({ showNav: false })} tag={Link} to="/users">Clients</NavLink>,
                        <NavLink onClick={() => this.setState({ showNav: false })} tag={Link} to="/doctypes">Document types</NavLink>,    
                    ]}
                    navStyle={{ backgroundColor: '#222526', maxWidth: '235px' }}
                    itemStyle={{ backgroundColor: '#222526', color: 'FFFFFF', listStyleType: 'none'}}
                    itemHoverStyle={{ backgroundColor: '#CDDC39', width: '100%' }}
                />
            </React.Fragment>
        );
    }
}
