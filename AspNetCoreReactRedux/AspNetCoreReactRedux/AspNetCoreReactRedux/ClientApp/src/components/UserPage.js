import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/User';
import { ExportCSV } from './ExportCSV';

class UserPage extends Component {

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
        // Этот метод вызывается при изменении параметров маршрута
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

        let header = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ background: 'rgba(0, 170, 204, 1)', float: 'left' }} label="Добавить" onClick={this.addNew} />
            <ExportCSV csvData={this.props.user} fileName={'Клиенты'} />
        </div>;

        let dialogHeader = <div className="ui-dialog-buttonpane p-clearfix">
            <p style={{ float: 'left' }}>Клиент</p>
            <Button style={{ float: 'right' }} className="p-button-danger" label="X" onClick={this.dialogHide} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{ background: 'rgba(0, 170, 204, 1)' }} label="Сохранить" onClick={this.save} />
            <Button style={{ background: 'rgba(242, 12, 108, 1)' }} label="Удалить" disabled={this.newUser ? true : false} onClick={this.delete} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <h2 style={{ color: 'rgba(80, 86, 89, 1)', marginBottom: '50px', marginTop: '50px' }}>Клиенты</h2>
                <DataTable value={this.props.user} selectionMode="single" header={header} selection={this.state.selectedUser} onSelectionChange={e => this.setState({ selectedUser: e.value })} onRowSelect={this.onUserSelect}>
                    <Column field="userId" header="ID" />
                    <Column field="fio" header="ФИО" />
                    <Column field="roleId" header="Роль в системе" />
                    <Column field="photo" header="Фото" />
                    <Column field="login" header="Логин" />
                    <Column field="passwordHash" header="Пароль" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header={dialogHeader} modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        
                        this.state.user && this.state.role &&

                        <div className="p-grid p-fluid">
                            
                            <div><label htmlFor="fio">ФИО</label></div>
                            <div>
                                <InputText id="fio" onChange={(e) => { this.updateProperty('fio', e.target.value) }} value={this.state.user.fio} />
                            </div>
                            <div><label htmlFor="role">Роль</label></div>
                            <select onChange={(e) => { this.updateProperty('roleId', e.target.value) }} value={this.state.user.roleId}>
                                <option value="">-- Выбрать роль --</option>
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

// Делает массив user доступным в props
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
)(UserPage);