import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/EquipmentType.js';
import { ExportCSV } from './ExportCSV';


class EquipmentTypePage extends Component {

    constructor() {
        super();
        this.state = {};
        this.onEquipmentTypeSelect = this.onEquipmentTypeSelect.bind(this);
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
        this.props.requestEquipmentType();
    }

    updateProperty(property, value) {
        let equipmenttype = this.state.equipmenttype;
        equipmenttype[property] = value;
        this.setState({ equipmenttype: equipmenttype });
    }

    onEquipmentTypeSelect(e) {
        this.newEquipmentType = false;
        this.setState({
            displayDialog: true,
            equipmenttype: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newEquipmentType = true;
        this.setState({
            equipmenttype: { name: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveEquipmentType(this.state.equipmenttype);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newEquipmentType ? "Сохранено" : "Обновлено" });
    }

    delete() {
        this.props.deleteEquipmentType(this.state.equipmenttype.equipmentTypeId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Удалено" });
    }

    render() {

        let header = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ background: 'rgba(0, 170, 204, 1)', float: 'left' }} label="Добавить" onClick={this.addNew} />
            <ExportCSV csvData={this.props.equipmenttype} fileName={'Типы инвентаря'} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{ background: 'rgba(0, 170, 204, 1)' }} label="Сохранить" onClick={this.save} />
            <Button style={{ background: 'rgba(242, 12, 108, 1)' }} label="Удалить" disabled={this.newEquipmentType ? true : false} onClick={this.delete} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <h2 style={{ color: 'rgba(80, 86, 89, 1)', marginBottom: '50px', marginTop: '50px' }}>Типы инвентаря</h2>
                <DataTable value={this.props.equipmenttype} selectionMode="single" header={header} selection={this.state.selectedEquipmentType} onSelectionChange={e => this.setState({ selectedEquipmentType: e.value })} onRowSelect={this.onEquipmentTypeSelect}>
                    <Column field="equipmentTypeId" header="ID" />
                    <Column field="name" header="Наименование" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="Тип инвентаря" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.equipmenttype &&

                        <div className="p-grid p-fluid">
                            <div><label htmlFor="name">Наименование</label></div>
                            <div>
                                <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value) }} value={this.state.equipmenttype.name} />
                            </div>

                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// Делает массив equipmenttype доступным в props
function mapStateToProps(state) {
    return {
        equipmenttype: state.equipmenttype.equipmenttype,
        loading: state.equipmenttype.loading,
        errors: state.equipmenttype.errors,
        forceReload:state.equipmenttype.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(EquipmentTypePage);