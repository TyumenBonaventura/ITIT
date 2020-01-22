import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/Equipment';
import { ExportCSV } from './ExportCSV';

class EquipmentPage extends Component {

    constructor() {
        super();
        this.state = {
            equipment: [],
            agecategory: [],
            equipmenttype: [],
            gender: [],
         //   reservationequipment: [],
         //   role: [],
        }  
        this.onEquipmentSelect = this.onEquipmentSelect.bind(this);
        this.dialogHide = this.dialogHide.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.fetchDataEquipment();
        this.fetchDataAgeCategory();
        this.fetchDataEquipmentType();
        this.fetchDataGender();
     //   this.fetchDataReservationEquipment();
    }

    componentDidUpdate() {
        // Этот метод вызывается при изменении параметров маршрута
        if (this.props.forceReload) {
            this.fetchDataEquipment();
            this.fetchDataAgeCategory();
            this.fetchDataEquipmentType();
            this.fetchDataGender();
        //    this.fetchDataReservationEquipment();
        //    this.fetchDataRole();
        }
    }

    fetchDataEquipment() {
        this.props.requestEquipment();
    }

    fetchDataAgeCategory() {
        this.props.requestAgeCategory();
    }

    fetchDataEquipmentType() {
        this.props.requestEquipmentType();
    }

    fetchDataGender() {
        this.props.requestGender();
    }

 /*   fetchDataReservationEquipment() {
        this.props.requestReservationEquipment();
    }*/

    updateProperty(property, value) {
        let equipment = this.state.equipment;
    //    let role = this.state.role;
        equipment[property] = value;
     //   role[property] = value;
        this.setState({ equipment: equipment});
    }

    onEquipmentSelect(e) {
        this.newEquipment = false;
        this.setState({
            displayDialog: true,
            equipment: Object.assign({}, e.data)/*,
        //    role: Object.assign({}, e.data)*/
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newEquipment = true;
        this.setState({
            equipment: { name: '', equipmentTypeId: '', size: '', amount: '', genderId: '', ageCategoryId: '', photo: '' },
            agecategory: { ageCategoryId: '', name: '' },
            equipmenttype: { equipmentTypeId: '', name: '' },
            gender: { genderId: '', name: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveEquipment(this.state.equipment);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newEquipment ? "Сохранено" : "Обновлено" });
    }

    delete() {
        this.props.deleteEquipment(this.state.equipment.equipmentId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Удалено" });
    }

    render() {

        let paginatorLeft = <Button icon="pi pi-refresh" />;
        let paginatorRight = <Button icon="pi pi-cloud-upload" />;

        let header = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ background: 'rgba(0, 170, 204, 1)', float: 'left' }} label="Добавить" onClick={this.addNew} />
            <ExportCSV csvData={this.props.equipment} fileName={'Инвентарь'} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{ background: 'rgba(0, 170, 204, 1)' }} label="Сохранить" onClick={this.save} />
            <Button style={{ background: 'rgba(242, 12, 108, 1)' }} label="Удалить" disabled={this.newEquipment ? true : false} onClick={this.delete} />
        </div>;
        /*<Column key={this.props.equipment.roleId} field={this.props.role.name} header="Роль в системе" />*/
        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <h2 style={{ color: 'rgba(80, 86, 89, 1)', marginBottom: '50px', marginTop: '50px' }}>Инвентарь</h2>
                <DataTable value={this.props.equipment} selectionMode="single" header={header} selection={this.state.selectedEquipment} onSelectionChange={e => this.setState({ selectedEquipment: e.value })} onRowSelect={this.onEquipmentSelect} paginator={true} rows={10} rowsPerPageOptions={[5, 10, 20]}>
                    <Column field="equipmentId" header="ID" />
                    <Column field="name" header="Наименование" />
                    <Column field="equipmentTypeId" header="Тип инвентаря" />
                    <Column field="size" header="Размер" />
                    <Column field="amount" header="Количество на складе" />       
                    <Column field="genderId" header="Пол" />
                    <Column field="ageCategoryId" header="Возрастная категория" />
                    <Column field="photo" header="Фото" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="Инвентарь" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        
                        this.state.equipment && this.state.agecategory && this.state.equipmenttype && this.state.gender &&

                        <div className="p-grid p-fluid">
                            
                            <div><label htmlFor="name">Наименование</label></div>
                            <div>
                                <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value) }} value={this.state.equipment.name} />
                            </div>
                            <div><label htmlFor="equipmentTypeId">Тип инвентаря</label></div>
                            <select onChange={(e) => { this.updateProperty('equipmentTypeId', e.target.value) }} value={this.state.equipment.equipmentTypeId}>
                                <option value="">-- Выбрать тип инвентаря --</option>
                                {this.props.equipmenttype.map(equipmenttype =>
                                    <option key={equipmenttype.equipmentTypeId} value={equipmenttype.equipmentTypeId}>{equipmenttype.name}</option>
                                )}
                            </select>  
                            <div><label htmlFor="size">Размер</label></div>
                            <div>
                                <InputText id="size" onChange={(e) => { this.updateProperty('size', e.target.value) }} value={this.state.equipment.size} />
                            </div>
                            <div><label htmlFor="amount">Количество на складе</label></div>
                            <div>
                                <InputText id="amount" onChange={(e) => { this.updateProperty('amount', e.target.value) }} value={this.state.equipment.amount} />
                            </div>
                            <div><label htmlFor="genderId">Пол</label></div>
                            <select onChange={(e) => { this.updateProperty('genderId', e.target.value) }} value={this.state.equipment.genderId}>
                                <option value="">-- Выбрать пол --</option>
                                {this.props.gender.map(gender =>
                                    <option key={gender.genderId} value={gender.genderId}>{gender.name}</option>
                                )}
                            </select>
                            <div><label htmlFor="ageCategoryId">Возрастная категория</label></div>
                            <select onChange={(e) => { this.updateProperty('ageCategoryId', e.target.value) }} value={this.state.equipment.ageCategoryId}>
                                <option value="">-- Выбрать категорию --</option>
                                {this.props.agecategory.map(agecategory =>
                                    <option key={agecategory.ageCategoryId} value={agecategory.ageCategoryId}>{agecategory.name}</option>
                                )}
                            </select>
                            <div><label htmlFor="photo">Фото</label></div>
                            <div>
                                <InputText id="photo" onChange={(e) => { this.updateProperty('photo', e.target.value) }} value={this.state.equipment.photo} />
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// Делает массив equipment доступным в props
function mapStateToProps(state) {
    return {
        equipment: state.equipment.equipment,
        gender: state.equipment.gender,
        agecategory: state.equipment.agecategory,
        equipmenttype: state.equipment.equipmenttype,
        loading: state.equipment.loading,
        errors: state.equipment.errors,
        forceReload:state.equipment.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(EquipmentPage);