import React, { Component } from 'react';
import SideNav, { MenuIcon } from 'react-simple-sidenav';

export default class SideMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <SideNav
                showNav={this.state.showNav}
                onHideNav={() => this.setState({ showNav: false })}
                title="Hello World"
                items={['home', 'services', 'about', 'contact']}
                titleStyle={{ backgroundColor: '#4CAF50' }}
                itemStyle={{ backgroundColor: '#fff' }}
                itemHoverStyle={{ backgroundColor: '#CDDC39' }}
            />
      )
    }   
}