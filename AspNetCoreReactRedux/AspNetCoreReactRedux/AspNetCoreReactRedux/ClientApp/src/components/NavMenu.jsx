import React from 'react';
import {
    Collapse,
    Container,
    Navbar,
    NavbarText,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import SideNav, { MenuIcon } from 'react-simple-sidenav';
import { withAuth } from '@okta/okta-react';
import 'bootstrap/dist/css/bootstrap.css';
import './style/NavMenu.css';
import './style/SideMenu.css';

export default withAuth(
    class NavMenu extends React.Component {
        constructor(props) {
            super(props);

            this.toggle = this.toggle.bind(this);
            this.state = {
                //  isOpen: false,
                showNav: true,
                authenticated: null,
                currentUserName: '',
                //   onHideNav: true
            };
        }
        toggle() {
            this.setState({
                showNav: !this.state.showNav,
                //   onHideNav: !this.state.onHideNav
            });
        }

        checkAuthentication = async () => {
            const authenticated = await this.props.auth.isAuthenticated();
            
            if (authenticated !== this.state.authenticated) {
                this.setState({ authenticated });
            }
        };

        getProfileInfo = async () => {
            this.props.auth.getUser().then(profile => {

                if (typeof profile === 'undefined') {

                    this.setState({
                        currentUserName: 'admin',
                    });

                 //   window.location.reload(true);
                }
                else {
                    const name = profile.name;

                    this.setState({
                        currentUserName: name,
                    });
                }
            });
        };

        async componentDidMount() {
          
            this.checkAuthentication();
            this.getProfileInfo();
        }

        async componentDidUpdate() {
            this.checkAuthentication();

            if ((this.state.currentUserName == '') || (this.state.currentUserName == 'admin')) {
                this.getProfileInfo();
            }
        }

        login = async () => {
            this.props.auth.login('/');
        };

        logout = async () => {
            this.props.auth.logout('/');
        };
        render() {

            const { currentUserName } = this.state;

            if (this.state.authenticated === null) return null;

            const loginLogoutButton = this.state.authenticated ? (

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
                                    <UncontrolledDropdown className="navbar-nav flex-grow" nav inNavbar>
                                        <DropdownToggle nav caret>
                                            <span className="text-light">{currentUserName}&nbsp;</span>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <NavLink tag={Link} onClick={this.logout} to="/">Выход</NavLink>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
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
                            <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/equipment">Инвентарь</NavLink>,
                            <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/reservation">Бронирования</NavLink>,
                            <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/rate">Тарифы</NavLink>,
                            <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/doctypes">Типы документов</NavLink>,
                            <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/equipment_types">Типы инвентаря</NavLink>,
                            <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/age_categories">Возрастные категории</NavLink>,
                            <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/reservation_status">Статусы бронирования</NavLink>,
                            <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/role">Роли пользователей в системе</NavLink>,
                            <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/day_of_week">Дни недели</NavLink>,
                            <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/gender">Пол</NavLink>,
                            <NavLink style={{ padding: '5px' }} onClick={() => this.setState({ showNav: false })} tag={Link} to="/reservation_equipment">БронированиеИнвентарь</NavLink>,
                        ]}
                        navStyle={{ backgroundColor: '#222526', maxWidth: '235px' }}
                        itemStyle={{ backgroundColor: '#222526', color: 'FFFFFF', listStyleType: 'none', padding: '5px' }}
                        itemHoverStyle={{ backgroundColor: '#CDDC39', width: '100%' }}
                    />
                </React.Fragment>
            ) : (
                    <React.Fragment>
                        
                    </React.Fragment>
                );

            return (loginLogoutButton);
        }
    }
);