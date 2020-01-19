import React, { Component } from 'react';

class Staff extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: ''
  };

  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name
    });
  }

  render() {
    const { currentUserEmail, currentUserName } = this.state;

    return (
      <div>
        <h2>Администратор: {currentUserName}</h2>
        <p>Email: {currentUserEmail}</p>
        <p>Вы успешно авторизовались в информационной системе проката спортивного инвентаря SnowMaster.</p>
      </div>
    );
  }
}

export default Staff;
