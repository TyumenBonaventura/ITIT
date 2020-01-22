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
import { actionCreators } from '../store/ReservationEquipment.js';
import { ExportCSV } from './ExportCSV';

class ReservationEquipmentPage extends Component {

    constructor() {
        super();
        this.state = {
            reservationequipment: [],
            reservation: [],
            equipment: [],
        }  
        this.onReservationEquipmentSelect = this.onReservationEquipmentSelect.bind(this);
        this.dialogHide = this.dialogHide.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.fetchDataReservationEquipment();
        this.fetchDataReservation();
        this.fetchDataEquipment();
    }

    componentDidUpdate() {
        // Этот метод вызывается при изменении параметров маршрута
        if (this.props.forceReload) {
            this.fetchDataReservationEquipment();
            this.fetchDataReservation();
            this.fetchDataEquipment();
        }
    }

    fetchDataReservationEquipment() {
        this.props.requestReservationEquipment();
    }

    fetchDataReservation() {
        this.props.requestReservation();
    }

    fetchDataEquipment() {
        this.props.requestEquipment();
    }

    updateProperty(property, value) {
        let reservationequipment = this.state.reservationequipment;
        reservationequipment[property] = value;
        this.setState({ reservationequipment: reservationequipment});
    }

    onReservationEquipmentSelect(e) {
        this.newReservationEquipment = false;
        this.setState({
            displayDialog: true,
            reservationequipment: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newReservationEquipment = true;
        this.setState({
            reservationequipment: { reservationId: '', equipmentId: '', amount: ''  },
            reservation: { reservationId: '', reservationStatusId: '', docTypeId: '', docNum: '', dateIssue: '', dateReturn: '', cost: '', comment: '' },
            equipment: { equipmentId: '', name: '', equipmentTypeId: '', size: '', amount: '', genderId: '', ageCategoryId: '', photo: '' },
            displayDialog: true
        });
    }

    save() {
        this.props.saveReservationEquipment(this.state.reservationequipment);
        this.dialogHide();
        this.growl.show({ severity: 'success', detail: this.newReservationEquipment ? "Сохранено" : "Обновлено" });
    }

    delete() {
        this.props.deleteReservationEquipment(this.state.reservationequipment.reservationEquipmentId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Удалено" });
    }

    render() {

        let header = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ background: 'rgba(0, 170, 204, 1)', float: 'left' }} label="Добавить" onClick={this.addNew} />
            <ExportCSV csvData={this.props.reservationequipment} fileName={'БронированиеИнвентарь'} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button style={{ background: 'rgba(0, 170, 204, 1)' }} label="Сохранить" onClick={this.save} />
            <Button style={{ background: 'rgba(242, 12, 108, 1)' }} label="Удалить" disabled={this.newReservationEquipment ? true : false} onClick={this.delete} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <h2 style={{ color: 'rgba(80, 86, 89, 1)', marginBottom: '50px', marginTop: '50px' }}>БронированиеИнвентарь</h2>
                <DataTable value={this.props.reservationequipment} selectionMode="single" header={header} selection={this.state.selectedReservationEquipment} onSelectionChange={e => this.setState({ selectedReservationEquipment: e.value })} onRowSelect={this.onReservationEquipmentSelect} paginator={true} rows={10} rowsPerPageOptions={[5, 10, 20]}>
                    <Column field="reservationEquipmentId" header="ID" />
                    <Column field="equipmentId" header="Инвентарь" />
                    <Column field="reservationId" header="Бронирование" />
                    <Column field="amount" header="Количество" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }} header="Тариф" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                    {
                        
                        this.state.reservationequipment && this.state.reservation && this.state.equipment &&

                        <div className="p-grid p-fluid">
                            <div><label htmlFor="equipment">Тип инвентаря</label></div>
                            <select onChange={(e) => { this.updateProperty('equipmentId', e.target.value) }} value={this.state.reservationequipment.equipmentId}>
                                <option value="">-- Инвентарь--</option>
                                {this.props.equipment.map(equipment =>
                                    <option key={equipment.equipmentId} value={equipment.equipmentId}>{equipment.name}</option>
                                )}
                            </select> 
                            <div><label htmlFor="reservation">Бронирование</label></div>
                            <select onChange={(e) => { this.updateProperty('reservationId', e.target.value) }} value={this.state.reservationequipment.reservationId}>
                                <option value="">-- Бронирование --</option>
                                {this.props.reservation.map(reservation =>
                                    <option key={reservation.reservationId} value={reservation.reservationId}>{reservation.reservationId}</option>
                                )}
                            </select>    
                            <div><label htmlFor="amount">Количество</label></div>
                            <div>
                                <InputText id="amount" onChange={(e) => { this.updateProperty('amount', e.target.value) }} value={this.state.reservationequipment.amount} />
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// Делает массив reservationequipment доступным в props
function mapStateToProps(state) {
    return {
        reservationequipment: state.reservationequipment.reservationequipment,
        reservation: state.reservationequipment.reservation,
        equipment: state.reservationequipment.equipment,
        loading: state.reservationequipment.loading,
        errors: state.reservationequipment.errors,
        forceReload:state.reservationequipment.forceReload
    }
}



export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ReservationEquipmentPage);