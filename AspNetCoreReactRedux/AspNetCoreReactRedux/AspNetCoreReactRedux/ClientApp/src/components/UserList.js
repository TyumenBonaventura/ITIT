import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';import { Dropdown } from 'primereact/dropdown';
//import { Dropdown } from 'react-native-material-dropdown';
import { actionCreators } from '../store/User';

class UserList extends Component {

    constructor() {
        super();
        this.state = {
            user: [],
            role: [],
        }  
        this.onUserSelect = this.onUserSelect.bind(this);
        this.dialogHide = this.dialogHide.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.fetchDataUser();
        this.fetchDataRole();
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        if (this.props.forceReload) {
            this.fetchDataUser();
            this.fetchDataRole();
        }
    }

    fetchDataUser() {
        this.props.requestUser();
    }

    fetchDataRole() {
        this.props.requestRole();
    }

    updateProperty(property, value) {
        let user = this.state.user;
    //    let role = this.state.role;
        user[property] = value;
     //   role[property] = value;
        this.setState({ user: user});
    }

    onUserSelect(e) {
        this.newUser = false;
        this.setState({
            displayDialog: true,
            user: Object.assign({}, e.data)/*,
        //    role: Object.assign({}, e.data)*/
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newUser = true;
        this.setState({
            user: { fio: '', roleId: '', photo: '', login: '', passwordHash: '' },
            role: { roleId: '', name: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveUser(this.state.user);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newUser ? "Сохранено" : "Обновлено" });
    }

    delete() {
        this.props.deleteUser(this.state.user.userId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Удалено" });
    }

    render() {

        

        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Клиенты </div>;

        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} label="Добавить" onClick={this.addNew} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Закрыть" onClick={this.dialogHide} />
            <Button label="Удалить" disabled={this.newUser ? true : false} onClick={this.delete} />
            <Button label="Сохранить" onClick={this.save} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <DataTable value={this.props.user} selectionMode="single" header={header} footer={footer} selection={this.state.selectedUser} onSelectionChange={e => this.setState({ selectedUser: e.value })} onRowSelect={this.onUserSelect}>
                    <Column field="userId" header="ID" />
                    <Column field="fio" header="ФИО" />
                    <Column field="roleId" header="Роль в системе" />
                    <Column field="photo" header="Фото" />
                    <Column field="login" header="Логин" />
                    <Column field="passwordHash" header="Пароль" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="Клиент" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        
                        this.state.user && this.state.role &&

                        <div className="p-grid p-fluid">
                            
                            <div><label htmlFor="fio">ФИО</label></div>
                            <div>
                                <InputText id="fio" onChange={(e) => { this.updateProperty('fio', e.target.value) }} value={this.state.user.fio} />
                            </div>
                            <div><label htmlFor="role">Роль</label></div>
                            <select onChange={(e) => { this.updateProperty('roleId', e.target.value) }} value={this.state.user.roleId}>
                                <option value="">-- Select Role --</option>
                                {this.props.role.map(role =>
                                    <option key={role.roleId} value={role.roleId}>{role.name}</option>
                                )}
                            </select>  
                            <div><label htmlFor="photo">Фото</label></div>
                            <div>
                                <InputText id="photo" onChange={(e) => { this.updateProperty('photo', e.target.value) }} value={this.state.user.photo} />
                            </div>
                            <div><label htmlFor="login">Логин</label></div>
                            <div>
                                <InputText id="login" onChange={(e) => { this.updateProperty('login', e.target.value) }} value={this.state.user.login} />
                            </div>
                            <div><label htmlFor="password">Пароль</label></div>
                            <div>
                                <InputText id="passwordHash" onChange={(e) => { this.updateProperty('passwordHash', e.target.value) }} value={this.state.user.passwordHash} />
                            </div>

                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// Make user array available in  props
function mapStateToProps(state) {
    return {
        user: state.user.user,
        role: state.user.role,
        loading: state.user.loading,
        errors: state.user.errors,
        forceReload:state.user.forceReload
    }
}



export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(UserList);