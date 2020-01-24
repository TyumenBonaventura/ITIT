import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/Role.js';
import { ExportCSV } from './ExportCSV';


class RolePage extends Component {

    constructor() {
        super();
        this.state = {};
        this.onRoleSelect = this.onRoleSelect.bind(this);
        this.dialogHide = this.dialogHide.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        // Этот метод вызывается при изменении параметров маршрута
        if (this.props.forceReload) {
            this.fetchData();
        }
    }

    fetchData() {
        this.props.requestRole();
    }

    updateProperty(property, value) {
        let role = this.state.role;
        role[property] = value;
        this.setState({ role: role });
    }

    onRoleSelect(e) {
        this.newRole = false;
        this.setState({
            displayDialog: true,
            role: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newRole = true;
        this.setState({
            role: { name: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveRole(this.state.role);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newRole ? "Сохранено" : "Обновлено" });
    }

    delete() {
        this.props.deleteRole(this.state.role.roleId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Удалено" });
    }

    render() {

     /*   let header = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ background: 'rgba(0, 170, 204, 1)', float: 'left' }} label="Добавить" onClick={this.addNew} />
            <ExportCSV csvData={this.props.role} fileName={'Роли пользователей в системе'} />
        </div>; */

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{ background: 'rgba(0, 170, 204, 1)' }} label="Сохранить" onClick={this.save} />
            <Button style={{ background: 'rgba(242, 12, 108, 1)' }} label="Удалить" disabled={this.newRole ? true : false} onClick={this.delete} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <h2 style={{ color: 'rgba(80, 86, 89, 1)', marginBottom: '50px', marginTop: '50px' }}>Роли пользователей в системе</h2>
                <DataTable value={this.props.role} selectionMode="single" /*header={header}*/ selection={this.state.selectedRole} onSelectionChange={e => this.setState({ selectedRole: e.value })} onRowSelect={this.onRoleSelect}>
                    <Column field="roleId" header="ID" />
                    <Column field="name" header="Наименование" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="Роль пользователя" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.role &&

                        <div className="p-grid p-fluid">
                            <div><label htmlFor="name">Наименование</label></div>
                            <div>
                                <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value) }} value={this.state.role.name} />
                            </div>

                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// // Делает массив role доступным в props
function mapStateToProps(state) {
    return {
        role: state.role.role,
        loading: state.role.loading,
        errors: state.role.errors,
        forceReload:state.role.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(RolePage);