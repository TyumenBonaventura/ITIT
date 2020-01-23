import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Staff extends Component {
    state = {
        currentUserName: '',
        currentUserEmail: '',
        currentUserGroups: '',
    };

    getProfileInfo = async () => {
        this.props.auth.getUser().then(profile => {

            if (typeof profile === 'undefined') {

                this.setState({
                    currentUserGroups: 'admin',
                });

                window.location.reload(true);
            }
            else {
                const name = profile.name;

                this.setState({
                    currentUserGroups: name,
                });
            }
        });
    };

    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));

        this.getProfileInfo();

        this.setState({
            currentUserEmail: idToken.idToken.claims.email,
            currentUserName: idToken.idToken.claims.name
        });
    }

    render() {
        const { currentUserEmail, currentUserName/*, currentUserGroups*/ } = this.state;

        return (
            <div>
                <h2>Администратор: {currentUserName}</h2>
                <p>Email: {currentUserEmail}</p>
                <p>Вы успешно авторизовались в ИС проката спортивного инвентаря "SnowMaster".</p>
            </div>
        );
    }
});
