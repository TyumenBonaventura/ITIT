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
            showNav: true,
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
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <img width="45px" height="45px" src="https://i.ibb.co/d0jFBnb/2019-06-12-21-42-05.png" />
                            <span>&nbsp;</span>
                         <NavbarBrand onClick={() => this.setState({ showNav: false })} tag={Link} to="/">SnowMaster</NavbarBrand>
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
                        <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/users">Клиенты</NavLink>,
                        <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/doctypes">Типы документов</NavLink>,
                        <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/equipment_types">Типы инвентаря</NavLink>,
                        <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/age_categories">Возрастные категории</NavLink>,
                        <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/gender">Пол</NavLink>, 
                        <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/role">Роль в системе</NavLink>,
                        <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/reservation_status">Статус бронирования</NavLink>, 
                        <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/day_of_week">День недели</NavLink>,
                        <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/rate">Тарифы</NavLink>, 
                    ]}
                    navStyle={{ backgroundColor: '#222526', maxWidth: '235px' }}
                    itemStyle={{ backgroundColor: '#222526', color: 'FFFFFF', listStyleType: 'none', padding: '5px' }}
                    itemHoverStyle={{ backgroundColor: '#CDDC39', width: '100%' }}
                />
            </React.Fragment>
        );
    }
}
