import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/Gender.js';
import { ExportCSV } from './ExportCSV';


class GenderPage extends Component {

    constructor() {
        super();
        this.state = {};
        this.onGenderSelect = this.onGenderSelect.bind(this);
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
        this.props.requestGender();
    }

    updateProperty(property, value) {
        let gender = this.state.gender;
        gender[property] = value;
        this.setState({ gender: gender });
    }

    onGenderSelect(e) {
        this.newGender = false;
        this.setState({
            displayDialog: true,
            gender: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newGender = true;
        this.setState({
            gender: { name: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveGender(this.state.gender);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newGender ? "Сохранено" : "Обновлено" });
    }

    delete() {
        this.props.deleteGender(this.state.gender.genderId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Удалено" });
    }

    render() {

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{ background: 'rgba(0, 170, 204, 1)' }} label="Сохранить" onClick={this.save} />
            <Button style={{ background: 'rgba(242, 12, 108, 1)' }} label="Удалить" disabled={this.newGender ? true : false} onClick={this.delete} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <h2 style={{ color: 'rgba(80, 86, 89, 1)', marginBottom: '50px', marginTop: '50px' }}>Пол</h2>
                <DataTable value={this.props.gender} selectionMode="single" selection={this.state.selectedGender} onSelectionChange={e => this.setState({ selectedGender: e.value })} onRowSelect={this.onGenderSelect}>
                    <Column field="genderId" header="ID" />
                    <Column field="name" header="Наименование" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="Пол" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.gender &&

                        <div className="p-grid p-fluid">
                            <div><label htmlFor="name">Наименование</label></div>
                            <div>
                                <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value) }} value={this.state.gender.name} />
                            </div>

                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// Делает массив gender доступным в props 
function mapStateToProps(state) {
    return {
        gender: state.gender.gender,
        loading: state.gender.loading,
        errors: state.gender.errors,
        forceReload:state.gender.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(GenderPage);